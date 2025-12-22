import { apiClient } from "../ApiClient";
import { BackendRoutes } from "../BackendRoutes";

export enum TransactionTypeEnum {
    DEPOSIT = "deposit",
    WITHDRAWAL = "withdrawal",
    TRANSFER = "transfer",
}

export enum TransactionStatusEnum {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
    REVERSED = "reversed",
}

export enum TransactionSourceEnum {
    ADMIN = "admin",
    API = "api",
    SYSTEM = "system",
    WEBHOOK = "webhook",
}

export enum TransactionPeriodEnum {
    TODAY = "today",
    WEEK = "week",
    MONTH = "month",
    QUARTER = "quarter",
    YEAR = "year",
    ALL = "all",
}

export interface TransactionListItem {
    id: string;
    reference: string;
    transaction_type: TransactionTypeEnum;
    transaction_type_display: string;
    status: TransactionStatusEnum;
    status_display: string;
    source: TransactionSourceEnum;
    source_display: string;
    amount: string;
    fees: string;
    net_amount: string;
    display_amount: string;
    narration: string;
    has_fees: boolean;
    is_credit: boolean;
    is_reversal: boolean;
    created_at: string;
    paid_at: string | null;
    sender_bank: string;
    sender_bank_account_number: string;
    sender_bank_account_name: string;
    receiver_bank: string;
    receiver_bank_account_number: string;
    receiver_bank_code: string;
}

export interface ReceiverDetails {
    id: string;
    wallet_type: string;
    user: {
        id: string;
        full_name: string;
        email: string;
    } | null;
}

export interface LoanDetails {
    id: string;
    loan_amount: string;
    status: string;
    created_at: string;
}

export interface ReversalDetails {
    id: string;
    reference: string;
    status: TransactionStatusEnum;
    created_at: string;
}

export interface ReversedFromDetails {
    id: string;
    reference: string;
    amount: string;
    created_at: string;
}

export interface SenderDetails {
    bank: string | null;
    account_number: string | null;
    account_name: string | null;
}

export interface ReceiverBankDetails {
    bank: string | null;
    account_number: string | null;
    bank_code: string | null;
}

export interface Transaction {
    id: string;
    reference: string;
    transaction_type: TransactionTypeEnum;
    transaction_type_display: string;
    status: TransactionStatusEnum;
    status_display: string;
    source: TransactionSourceEnum;
    source_display: string;
    amount: string;
    fees: string;
    net_amount: string;
    display_amount: string;
    has_fees: boolean;
    is_credit: boolean;
    narration: string;
    receiver_details: ReceiverDetails | null;
    loan_details: LoanDetails | null;
    reversal_details: ReversalDetails | null;
    reversed_from_details: ReversedFromDetails | null;
    sender_details: SenderDetails | null;
    receiver_bank_details: ReceiverBankDetails | null;
    is_reversal: boolean;
    can_be_reversed: boolean;
    created_at: string;
    updated_at: string;
    paid_at: string | null;
    metadata: Record<string, any>;
}

export interface TransactionFilters {
    created_after?: string;
    created_before?: string;
    created_date?: string;
    paid_after?: string;
    paid_before?: string;
    amount_min?: number;
    amount_max?: number;
    amount_exact?: number;
    net_amount_min?: number;
    net_amount_max?: number;
    fees_min?: number;
    fees_max?: number;
    has_fees?: boolean;
    transaction_type?: TransactionTypeEnum[];
    status?: TransactionStatusEnum[];
    source?: TransactionSourceEnum[];
    wallet?: string;
    wallet_user?: string;
    reference?: string;
    reference_contains?: string;
    narration_contains?: string;
    search?: string;
    receiver?: string;
    has_receiver?: boolean;
    loan?: string;
    has_loan?: boolean;
    sender_bank_account?: string;
    receiver_bank_account?: string;
    sender_bank?: string;
    receiver_bank?: string;
    is_reversal?: boolean;
    has_been_reversed?: boolean;
    reversed_from?: string;
    is_successful?: boolean;
    is_failed_or_reversed?: boolean;
    ordering?: string;
    page?: number;
}

export interface DateRange {
    start: string | null;
    end: string | null;
}

export interface OverviewStats {
    total_transactions: number;
    successful_count: number;
    pending_count: number;
    failed_count: number;
    reversed_count: number;
}

export interface TransactionTypeStats {
    total_amount: string;
    count: number;
    average: string;
}

export interface TransferStats {
    sent_amount: string;
    sent_count: number;
    received_amount: string;
    received_count: number;
}

export interface FeeStats {
    total_fees: string;
    average_fees: string;
}

export interface AmountStats {
    largest_transaction: string;
    smallest_transaction: string;
    average_transaction: string;
}

export interface CashFlow {
    total_inflow: string;
    total_outflow: string;
    net_flow: string;
}

export interface TransactionStatisticsResponse {
    wallet_id: string;
    current_balance: string;
    date_range: DateRange;
    overview: OverviewStats;
    deposits: TransactionTypeStats;
    withdrawals: TransactionTypeStats;
    transfers: TransferStats;
    fees: FeeStats;
    amounts: AmountStats;
    cash_flow: CashFlow;
}

export interface TransactionStatisticsFilters {
    start_date?: string;
    end_date?: string;
    period?: TransactionPeriodEnum;
}

export interface PaginatedAnything<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export interface PaginatedTransactionListItem extends PaginatedAnything<TransactionListItem> { }

class TransactionService {
    static async getMyTransactions(filters?: TransactionFilters): Promise<PaginatedTransactionListItem> {
        const res = await apiClient.get<PaginatedTransactionListItem>(
            BackendRoutes.getMyTransactions,
            {
                requiresAuth: true,
                params: filters,
            }
        );
        return res.data;
    }

    static async getTransactionDetail(id: string): Promise<Transaction> {
        const res = await apiClient.get<Transaction>(
            BackendRoutes.getTransactionDetail(id),
            {
                requiresAuth: true,
            }
        );
        return res.data;
    }

    static async getTransactionStatistics(filters?: TransactionStatisticsFilters): Promise<TransactionStatisticsResponse> {
        const res = await apiClient.get<TransactionStatisticsResponse>(
            BackendRoutes.getTransactionStatistics,
            {
                requiresAuth: true,
                params: filters,
            }
        );
        return res.data;
    }
}

export default TransactionService;