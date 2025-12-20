"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/api/auth/authContext";
import { authUtils } from "@/lib/api/auth/TokenManager";
import { FrontendRoutes } from "@/lib/api/FrontendRoutes";
import {
    LoanApplicationService,
    LoanProductService,
    type LoanProduct,
    type LoanProductConfig,
} from "@/lib/api/services/Loan.Service";
import { toast } from "react-toastify";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Wallet,
    Calculator,
    FileText,
    CheckCircle2,
    AlertCircle,
    Info,
    Loader2,
    Percent,
    Calendar,
    Banknote,
    TrendingUp,
} from "lucide-react";

interface FormData {
    product: string;
    amount_requested: string;
    tenure_months: number;
    reason: string;
}

const formatCurrency = (amount: string | number): string => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(isNaN(num) ? 0 : num);
};

const calculateLoanDetails = (
    principal: number,
    interestRate: number,
    tenureMonths: number
) => {
    const totalInterest = principal * interestRate;
    const totalPayable = principal + totalInterest;
    const monthlyPayment = totalPayable / tenureMonths;

    return {
        totalInterest,
        totalPayable,
        monthlyPayment,
    };
};

export default function LoanRequestPage() {
    const { user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedProductId = searchParams?.get("product");

    const [currentStep, setCurrentStep] = useState(1);
    const [products, setProducts] = useState<LoanProduct[]>([]);
    const [config, setConfig] = useState<LoanProductConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        product: "",
        amount_requested: "",
        tenure_months: 0,
        reason: "",
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});


    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [productsResponse, configResponse] = await Promise.all([
                LoanProductService.getLoanProducts({ is_active: true }),
                LoanProductService.getLoanProductConfig(),
            ]);

            setProducts(productsResponse.results || []);
            setConfig(configResponse);

            if (preselectedProductId) {
                const product = productsResponse.results.find(
                    (p) => p.id === preselectedProductId
                );
                if (product) {
                    setFormData((prev) => ({ ...prev, product: product.id }));
                }
            }
        } catch (err: any) {
            console.error("Error fetching data:", err);
            toast.error("Failed to load loan products");
        } finally {
            setLoading(false);
        }
    };

    const selectedProduct = useMemo(() => {
        return products.find((p) => p.id === formData.product);
    }, [products, formData.product]);

    const loanDetails = useMemo(() => {
        if (!selectedProduct || !formData.amount_requested || !formData.tenure_months) {
            return null;
        }

        const principal = parseFloat(formData.amount_requested);
        const interestRate = parseFloat(selectedProduct.interest_rate);
        const tenure = formData.tenure_months;

        if (isNaN(principal) || principal <= 0) return null;

        return calculateLoanDetails(principal, interestRate, tenure);
    }, [selectedProduct, formData.amount_requested, formData.tenure_months]);

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<FormData> = {};

        if (step === 1) {
            if (!formData.product) {
                newErrors.product = "Please select a loan product";
            }
        }

        if (step === 2) {
            if (!formData.amount_requested) {
                newErrors.amount_requested = "Please enter an amount";
            } else {
                const amount = parseFloat(formData.amount_requested);
                if (selectedProduct) {
                    const min = parseFloat(selectedProduct.min_amount);
                    const max = parseFloat(selectedProduct.max_amount);
                    if (amount < min) {
                        newErrors.amount_requested = `Minimum amount is ${formatCurrency(min)}`;
                    } else if (amount > max) {
                        newErrors.amount_requested = `Maximum amount is ${formatCurrency(max)}`;
                    }
                }
            }
        }

        if (step === 3) {
            if (!formData.tenure_months || formData.tenure_months <= 0) {
                newErrors.tenure_months = "Please select a tenure";
            } else if (selectedProduct) {
                if (formData.tenure_months < selectedProduct.min_tenure_months) {
                    newErrors.tenure_months = `Minimum tenure is ${selectedProduct.min_tenure_months} months`;
                } else if (formData.tenure_months > selectedProduct.max_tenure_months) {
                    newErrors.tenure_months = `Maximum tenure is ${selectedProduct.max_tenure_months} months`;
                }
            }
        }

        if (step === 4) {
            if (!formData.reason || formData.reason.trim().length < 10) {
                newErrors.reason = "Please provide a reason (at least 10 characters)";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => Math.min(prev + 1, 5));
        }
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const goToStep = (step: number) => {
        if (step < currentStep) {
            setCurrentStep(step);
        } else {
            let canProceed = true;
            for (let i = currentStep; i < step; i++) {
                if (!validateStep(i)) {
                    canProceed = false;
                    break;
                }
            }
            if (canProceed) {
                setCurrentStep(step);
            }
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;

        try {
            setSubmitting(true);

            const payload = {
                product: formData.product,
                amount_requested: formData.amount_requested,
                tenure_months: formData.tenure_months,
                reason: formData.reason,
            };

            await LoanApplicationService.createLoanApplication(payload);

            toast.success("Loan application submitted successfully!");

            setTimeout(() => {
                router.push("/dashboard/loans");
            }, 1500);
        } catch (err: any) {
            console.error("Error submitting application:", err);
            toast.error(err?.message || "Failed to submit application");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-[#019893] mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading loan products...</p>
                </div>
            </div>
        );
    }

    const steps = [
        { number: 1, title: "Select Product", icon: Wallet },
        { number: 2, title: "Enter Amount", icon: Banknote },
        { number: 3, title: "Choose Tenure", icon: Calendar },
        { number: 4, title: "Provide Details", icon: FileText },
        { number: 5, title: "Review & Submit", icon: CheckCircle2 },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="mb-8">
                <button
                    onClick={() => router.push("/dashboard/loans")}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#019893] transition-colors mb-4"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Dashboard</span>
                </button>
                <h1 className="text-3xl font-bold text-[#001B2E]">Apply for a Loan</h1>
                <p className="text-gray-500 mt-2">
                    Complete the steps below to submit your loan application
                </p>
            </div>

            <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isCompleted = currentStep > step.number;
                        const isCurrent = currentStep === step.number;

                        return (
                            <React.Fragment key={step.number}>
                                <div className="flex flex-col items-center flex-1">
                                    <button
                                        onClick={() => goToStep(step.number)}
                                        disabled={step.number > currentStep}
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all mb-2 ${isCompleted
                                                ? "bg-[#019893] text-white"
                                                : isCurrent
                                                    ? "bg-[#019893] text-white ring-4 ring-[#019893]/20"
                                                    : "bg-gray-200 text-gray-400"
                                            } ${step.number <= currentStep ? "cursor-pointer hover:scale-110" : "cursor-not-allowed"}`}
                                    >
                                        {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                                    </button>
                                    <span
                                        className={`text-xs font-medium text-center ${isCurrent
                                                ? "text-[#019893]"
                                                : isCompleted
                                                    ? "text-gray-700"
                                                    : "text-gray-400"
                                            }`}
                                    >
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`h-1 flex-1 mx-2 rounded transition-all ${currentStep > step.number ? "bg-[#019893]" : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-[#CCEAE9] p-8">
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#019893]/10 rounded-full mb-4">
                                <Wallet className="w-8 h-8 text-[#019893]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#001B2E] mb-2">
                                Choose Your Loan Product
                            </h2>
                            <p className="text-gray-500">
                                Select the loan product that best fits your needs
                            </p>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-12">
                                <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500">No loan products available</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {products.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => {
                                            setFormData({ ...formData, product: product.id });
                                            setErrors({ ...errors, product: undefined });
                                        }}
                                        className={`text-left p-6 rounded-xl border-2 transition-all ${formData.product === product.id
                                                ? "border-[#019893] bg-[#019893]/5 ring-4 ring-[#019893]/10"
                                                : "border-gray-200 hover:border-[#019893]/50 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="font-semibold text-lg text-[#001B2E] mb-1">
                                                    {product.name}
                                                </h3>
                                                <span
                                                    className={`text-xs font-medium px-2 py-1 rounded-full ${product.risk_level === "LOW"
                                                            ? "bg-green-100 text-green-700"
                                                            : product.risk_level === "MEDIUM"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {product.risk_level_display}
                                                </span>
                                            </div>
                                            {formData.product === product.id && (
                                                <CheckCircle2 className="text-[#019893]" size={24} />
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Amount Range</span>
                                                <span className="font-semibold text-[#001B2E]">
                                                    {formatCurrency(product.min_amount)} -{" "}
                                                    {formatCurrency(product.max_amount)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Interest Rate</span>
                                                <span className="font-semibold text-[#019893]">
                                                    {(parseFloat(product.interest_rate) * 100).toFixed(2)}%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Tenure</span>
                                                <span className="font-semibold text-[#001B2E]">
                                                    {product.min_tenure_months} - {product.max_tenure_months}{" "}
                                                    months
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {errors.product && (
                            <div className="flex items-center gap-2 text-red-600 text-sm mt-4">
                                <AlertCircle size={16} />
                                {errors.product}
                            </div>
                        )}
                    </div>
                )}

                {currentStep === 2 && selectedProduct && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#019893]/10 rounded-full mb-4">
                                <Banknote className="w-8 h-8 text-[#019893]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#001B2E] mb-2">
                                How Much Do You Need?
                            </h2>
                            <p className="text-gray-500">
                                Enter the loan amount you wish to borrow
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <div className="bg-gradient-to-br from-[#019893] to-[#017C77] rounded-2xl p-6 text-white mb-6">
                                <div className="text-sm opacity-90 mb-2">Selected Product</div>
                                <div className="text-xl font-bold">{selectedProduct.name}</div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Loan Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                            ₦
                                        </span>
                                        <input
                                            type="number"
                                            value={formData.amount_requested}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    amount_requested: e.target.value,
                                                });
                                                setErrors({ ...errors, amount_requested: undefined });
                                            }}
                                            placeholder="0"
                                            className="w-full pl-10 pr-4 py-4 text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#019893] focus:border-transparent transition"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                                        <span>
                                            Min: {formatCurrency(selectedProduct.min_amount)}
                                        </span>
                                        <span>
                                            Max: {formatCurrency(selectedProduct.max_amount)}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <input
                                        type="range"
                                        min={parseFloat(selectedProduct.min_amount)}
                                        max={parseFloat(selectedProduct.max_amount)}
                                        step="10000"
                                        value={formData.amount_requested || selectedProduct.min_amount}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                amount_requested: e.target.value,
                                            });
                                            setErrors({ ...errors, amount_requested: undefined });
                                        }}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#019893]"
                                    />
                                </div>

                                {errors.amount_requested && (
                                    <div className="flex items-center gap-2 text-red-600 text-sm">
                                        <AlertCircle size={16} />
                                        {errors.amount_requested}
                                    </div>
                                )}

                                <div className="grid grid-cols-4 gap-3">
                                    {[100000, 250000, 500000, 1000000].map((amount) => {
                                        const min = parseFloat(selectedProduct.min_amount);
                                        const max = parseFloat(selectedProduct.max_amount);
                                        if (amount >= min && amount <= max) {
                                            return (
                                                <button
                                                    key={amount}
                                                    onClick={() => {
                                                        setFormData({
                                                            ...formData,
                                                            amount_requested: amount.toString(),
                                                        });
                                                        setErrors({ ...errors, amount_requested: undefined });
                                                    }}
                                                    className="py-3 px-4 bg-gray-100 hover:bg-[#019893] hover:text-white rounded-lg font-medium text-sm transition-all"
                                                >
                                                    {formatCurrency(amount)}
                                                </button>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                                {loanDetails && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-blue-700 mb-3">
                                            <Calculator size={18} />
                                            <span className="font-semibold text-sm">
                                                Loan Preview
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-blue-600 mb-1">
                                                    Total Interest
                                                </p>
                                                <p className="text-lg font-bold text-blue-900">
                                                    {formatCurrency(loanDetails.totalInterest)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-blue-600 mb-1">
                                                    Total Payable
                                                </p>
                                                <p className="text-lg font-bold text-blue-900">
                                                    {formatCurrency(loanDetails.totalPayable)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 3 && selectedProduct && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#019893]/10 rounded-full mb-4">
                                <Calendar className="w-8 h-8 text-[#019893]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#001B2E] mb-2">
                                Select Repayment Period
                            </h2>
                            <p className="text-gray-500">
                                Choose how long you need to repay the loan
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
                                {Array.from(
                                    {
                                        length:
                                            selectedProduct.max_tenure_months -
                                            selectedProduct.min_tenure_months +
                                            1,
                                    },
                                    (_, i) => selectedProduct.min_tenure_months + i
                                ).map((months) => (
                                    <button
                                        key={months}
                                        onClick={() => {
                                            setFormData({ ...formData, tenure_months: months });
                                            setErrors({ ...errors, tenure_months: undefined });
                                        }}
                                        className={`py-4 px-2 rounded-xl border-2 transition-all ${formData.tenure_months === months
                                                ? "border-[#019893] bg-[#019893] text-white shadow-lg scale-105"
                                                : "border-gray-200 hover:border-[#019893]/50 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="text-2xl font-bold mb-1">{months}</div>
                                        <div className="text-xs opacity-80">
                                            month{months !== 1 && "s"}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {errors.tenure_months && (
                                <div className="flex items-center gap-2 text-red-600 text-sm mb-6">
                                    <AlertCircle size={16} />
                                    {errors.tenure_months}
                                </div>
                            )}

                            {loanDetails && formData.tenure_months > 0 && (
                                <div className="bg-gradient-to-br from-[#019893] to-[#017C77] rounded-2xl p-6 text-white">
                                    <div className="flex items-center gap-2 mb-4">
                                        <TrendingUp size={20} />
                                        <span className="font-semibold">Monthly Payment</span>
                                    </div>
                                    <div className="text-4xl font-bold mb-2">
                                        {formatCurrency(loanDetails.monthlyPayment)}
                                    </div>
                                    <p className="text-sm opacity-90">
                                        for {formData.tenure_months} month
                                        {formData.tenure_months !== 1 && "s"}
                                    </p>

                                    <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-xs opacity-75 mb-1">Principal</div>
                                            <div className="font-semibold">
                                                {formatCurrency(formData.amount_requested)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs opacity-75 mb-1">Interest</div>
                                            <div className="font-semibold">
                                                {formatCurrency(loanDetails.totalInterest)}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs opacity-75 mb-1">Total</div>
                                            <div className="font-semibold">
                                                {formatCurrency(loanDetails.totalPayable)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#019893]/10 rounded-full mb-4">
                                <FileText className="w-8 h-8 text-[#019893]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#001B2E] mb-2">
                                Tell Us More
                            </h2>
                            <p className="text-gray-500">
                                Provide a reason for your loan application
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Reason for Loan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={formData.reason}
                                    onChange={(e) => {
                                        setFormData({ ...formData, reason: e.target.value });
                                        setErrors({ ...errors, reason: undefined });
                                    }}
                                    placeholder="E.g., Business expansion, equipment purchase, working capital..."
                                    rows={6}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#019893] focus:border-transparent transition resize-none"
                                />
                                <div className="flex items-center justify-between mt-2">
                                    <span
                                        className={`text-sm ${formData.reason.length < 10
                                                ? "text-gray-400"
                                                : "text-green-600"
                                            }`}
                                    >
                                        {formData.reason.length} characters (minimum 10)
                                    </span>
                                </div>
                            </div>

                            {errors.reason && (
                                <div className="flex items-center gap-2 text-red-600 text-sm mt-4">
                                    <AlertCircle size={16} />
                                    {errors.reason}
                                </div>
                            )}

                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <div className="flex items-start gap-2">
                                    <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                                    <div className="text-sm text-blue-800">
                                        <p className="font-semibold mb-1">💡 Tips for approval:</p>
                                        <ul className="space-y-1 text-xs">
                                            <li>• Be specific about how you'll use the funds</li>
                                            <li>• Explain how the loan will benefit your business</li>
                                            <li>• Mention your repayment plan if applicable</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 5 && selectedProduct && loanDetails && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#019893]/10 rounded-full mb-4">
                                <CheckCircle2 className="w-8 h-8 text-[#019893]" />
                            </div>
                            <h2 className="text-2xl font-bold text-[#001B2E] mb-2">
                                Review Your Application
                            </h2>
                            <p className="text-gray-500">
                                Please verify all details before submitting
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-[#001B2E]">Loan Product</h3>
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="text-[#019893] text-sm hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-[#019893]/10 rounded-lg">
                                        <Wallet className="text-[#019893]" size={24} />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-[#001B2E]">
                                            {selectedProduct.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {(parseFloat(selectedProduct.interest_rate) * 100).toFixed(
                                                2
                                            )}
                                            % interest rate
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-[#001B2E]">
                                        Loan Details
                                    </h3>
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="text-[#019893] text-sm hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">
                                            Loan Amount
                                        </div>
                                        <div className="text-xl font-bold text-[#001B2E]">
                                            {formatCurrency(formData.amount_requested)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">
                                            Repayment Period
                                        </div>
                                        <div className="text-xl font-bold text-[#001B2E]">
                                            {formData.tenure_months} months
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#019893] to-[#017C77] rounded-xl p-6 text-white">
                                <h3 className="font-semibold mb-4">Payment Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="opacity-90">Principal Amount</span>
                                        <span className="font-bold text-lg">
                                            {formatCurrency(formData.amount_requested)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="opacity-90">Total Interest</span>
                                        <span className="font-bold text-lg">
                                            {formatCurrency(loanDetails.totalInterest)}
                                        </span>
                                    </div>
                                    <div className="border-t border-white/20 pt-3">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">Total Payable</span>
                                            <span className="font-bold text-2xl">
                                                {formatCurrency(loanDetails.totalPayable)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-3 mt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Monthly Payment</span>
                                            <span className="font-bold text-xl">
                                                {formatCurrency(loanDetails.monthlyPayment)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-[#001B2E]">
                                        Reason for Loan
                                    </h3>
                                    <button
                                        onClick={() => setCurrentStep(4)}
                                        className="text-[#019893] text-sm hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <p className="text-gray-700">{formData.reason}</p>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                                <div className="flex items-start gap-2">
                                    <Info
                                        className="text-yellow-600 flex-shrink-0 mt-0.5"
                                        size={18}
                                    />
                                    <div className="text-sm text-yellow-800">
                                        <p className="font-semibold mb-1">Important Notice</p>
                                        <p className="text-xs">
                                            By submitting this application, you agree to our terms and
                                            conditions. Your application will be reviewed within 24-48
                                            hours.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                    {currentStep < 5 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-3 bg-[#019893] hover:bg-[#017C77] text-white rounded-lg font-semibold transition-all"
                        >
                            Next
                            <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex items-center gap-2 px-8 py-3 bg-[#019893] hover:bg-[#017C77] text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={20} />
                                    Submit Application
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}