"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/api/auth/authContext';
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  Eye,
  Download
} from 'lucide-react';
import TransactionService, {
  TransactionListItem,
  TransactionStatisticsResponse,
  TransactionFilters as TransactionFiltersType,
  TransactionTypeEnum,
  TransactionStatusEnum,
  TransactionPeriodEnum,
  Transaction
} from "@/lib/api/services/Transaction.Service"

// Statistics Card Component
const StatsCard: React.FC<{
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  colorClass: string;
}> = ({ title, value, subtitle, icon, trend, colorClass }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all ">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
          }`}>
          {trend === 'up' && <TrendingUp className="w-4 h-4" />}
          {trend === 'down' && <TrendingDown className="w-4 h-4" />}
        </div>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
    {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
  </div>
);

// Transaction Status Badge
const StatusBadge: React.FC<{ status: TransactionStatusEnum }> = ({ status }) => {
  const config = {
    [TransactionStatusEnum.SUCCESS]: {
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-200'
    },
    [TransactionStatusEnum.PENDING]: {
      icon: <Clock className="w-3.5 h-3.5" />,
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      border: 'border-yellow-200'
    },
    [TransactionStatusEnum.FAILED]: {
      icon: <XCircle className="w-3.5 h-3.5" />,
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-200'
    },
    [TransactionStatusEnum.REVERSED]: {
      icon: <RotateCcw className="w-3.5 h-3.5" />,
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      border: 'border-purple-200'
    },
  };

  const { icon, bg, text, border } = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text} border ${border}`}>
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Transaction Type Icon
const TransactionTypeIcon: React.FC<{ type: TransactionTypeEnum; isCredit: boolean }> = ({ type, isCredit }) => {
  const iconClass = "w-5 h-5";

  if (type === TransactionTypeEnum.DEPOSIT) {
    return <ArrowDownLeft className={`${iconClass} text-green-600`} />;
  }
  if (type === TransactionTypeEnum.WITHDRAWAL) {
    return <ArrowUpRight className={`${iconClass} text-red-600`} />;
  }
  return <ArrowLeftRight className={`${iconClass} text-blue-600`} />;
};

// Transaction Item Component
const TransactionItem: React.FC<{
  transaction: TransactionListItem;
  onClick: () => void;
}> = ({ transaction, onClick }) => {
  const formattedDate = new Date(transaction.created_at).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      onClick={onClick}
      className="bg-white hover:bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 cursor-pointer transition-all group "
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className={`p-2.5 rounded-lg ${transaction.is_credit ? 'bg-green-50' : 'bg-red-50'
            }`}>
            <TransactionTypeIcon type={transaction.transaction_type} isCredit={transaction.is_credit} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-gray-900 font-medium truncate">
                {transaction.transaction_type_display}
              </h3>
              {transaction.is_reversal && (
                <span className="text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                  Reversal
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm truncate mb-1">
              {transaction.narration || 'No description'}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="truncate">Ref: {transaction.reference}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className={`text-lg font-semibold ${transaction.is_credit ? 'text-green-600' : 'text-red-600'
              }`}>
              {(transaction.transaction_type == "deposit" && ['deposit', 'withdrawal'].includes(transaction.transaction_type)) ? "+" : "-"}
              {transaction.amount}
            </p>
            {transaction.has_fees && (
              <p className="text-xs text-gray-500">Fee: ₦{parseFloat(transaction.fees).toLocaleString()}</p>
            )}
          </div>

          <StatusBadge status={transaction.status} />

          <Eye className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
        </div>
      </div>
    </div>
  );
};

// Transaction Detail Modal
const TransactionDetailModal: React.FC<{
  transaction: TransactionListItem;
  onClose: () => void;
}> = ({ transaction, onClose }) => {
  const detailRows = [
    { label: 'Reference', value: transaction.reference },
    { label: 'Type', value: transaction.transaction_type_display },
    { label: 'Status', value: <StatusBadge status={transaction.status} /> },
    { label: 'Amount', value: `₦${parseFloat(transaction.amount).toLocaleString()}` },
    { label: 'Fees', value: `₦${parseFloat(transaction.fees).toLocaleString()}` },
    { label: 'Net Amount', value: `₦${parseFloat(transaction.net_amount).toLocaleString()}` },
    { label: 'Source', value: transaction.source_display },
    { label: 'Created', value: new Date(transaction.created_at).toLocaleString() },
    { label: 'Paid', value: transaction.paid_at ? new Date(transaction.paid_at).toLocaleString() : 'N/A' },
  ];

  const bankDetails = [];
  if (transaction.sender_bank) {
    bankDetails.push({ label: 'Sender Bank', value: transaction.sender_bank });
  }
  if (transaction.sender_bank_account_number) {
    bankDetails.push({ label: 'Sender Account', value: transaction.sender_bank_account_number });
  }
  if (transaction.sender_bank_account_name) {
    bankDetails.push({ label: 'Sender Name', value: transaction.sender_bank_account_name });
  }
  if (transaction.receiver_bank) {
    bankDetails.push({ label: 'Receiver Bank', value: transaction.receiver_bank });
  }
  if (transaction.receiver_bank_account_number) {
    bankDetails.push({ label: 'Receiver Account', value: transaction.receiver_bank_account_number });
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm">Transaction Amount</span>
              <TransactionTypeIcon type={transaction.transaction_type} isCredit={transaction.is_credit} />
            </div>
            <p className={`text-3xl font-bold ${transaction.is_credit ? 'text-green-600' : 'text-red-600'
              }`}>
              {transaction.display_amount}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
              General Information
            </h3>
            <div className="space-y-3">
              {detailRows.map((row, idx) => (
                <div key={idx} className="flex justify-between items-start py-2 border-b border-gray-200">
                  <span className="text-gray-600 text-sm">{row.label}</span>
                  <span className="text-gray-900 text-sm font-medium text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {bankDetails.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                Bank Details
              </h3>
              <div className="space-y-3">
                {bankDetails.map((row, idx) => (
                  <div key={idx} className="flex justify-between items-start py-2 border-b border-gray-200">
                    <span className="text-gray-600 text-sm">{row.label}</span>
                    <span className="text-gray-900 text-sm font-medium text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {transaction.narration && (
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                Description
              </h3>
              <p className="text-gray-900 text-sm bg-gray-50 rounded-lg p-4 border border-gray-200">
                {transaction.narration}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Filters Component
const TransactionFilters: React.FC<{
  filters: TransactionFiltersType;
  onFilterChange: (filters: TransactionFiltersType) => void;
  onReset: () => void;
}> = ({ filters, onFilterChange, onReset }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 ">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full bg-gray-50 text-gray-900 rounded-lg pl-10 pr-4 py-2.5 border border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filters
          {Object.keys(filters).length > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {Object.keys(filters).filter(k => filters[k as keyof TransactionFiltersType]).length}
            </span>
          )}
        </button>

        {Object.keys(filters).length > 0 && (
          <button
            onClick={onReset}
            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Transaction Type</label>
            <select
              value={filters.transaction_type?.[0] || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                transaction_type: e.target.value ? [e.target.value as TransactionTypeEnum] : undefined
              })}
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Types</option>
              <option value={TransactionTypeEnum.DEPOSIT}>Deposit</option>
              <option value={TransactionTypeEnum.WITHDRAWAL}>Withdrawal</option>
              <option value={TransactionTypeEnum.TRANSFER}>Transfer</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Status</label>
            <select
              value={filters.status?.[0] || ''}
              onChange={(e) => onFilterChange({
                ...filters,
                status: e.target.value ? [e.target.value as TransactionStatusEnum] : undefined
              })}
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Status</option>
              <option value={TransactionStatusEnum.SUCCESS}>Success</option>
              <option value={TransactionStatusEnum.PENDING}>Pending</option>
              <option value={TransactionStatusEnum.FAILED}>Failed</option>
              <option value={TransactionStatusEnum.REVERSED}>Reversed</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">Sort By</label>
            <select
              value={filters.ordering || '-created_at'}
              onChange={(e) => onFilterChange({ ...filters, ordering: e.target.value })}
              className="w-full bg-gray-50 text-gray-900 rounded-lg px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="-amount">Highest Amount</option>
              <option value="amount">Lowest Amount</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Page Component
const TransactionHistoryPage: React.FC = () => {
  const { user, doAuthCheck } = useAuth();
  const [transactions, setTransactions] = useState<TransactionListItem[]>([]);
  const [stats, setStats] = useState<TransactionStatisticsResponse | null>(null);
  const [filters, setFilters] = useState<TransactionFiltersType>({ page: 1 });
  const [selectedPeriod, setSelectedPeriod] = useState<TransactionPeriodEnum>(TransactionPeriodEnum.MONTH);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionListItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [pagination, setPagination] = useState({ count: 0, next: null, previous: null });

  useEffect(()=>{
    doAuthCheck();
  }, [user])

  useEffect(() => {
    loadTransactions();
  }, [filters]);

  useEffect(() => {
    loadStats();
  }, [selectedPeriod]);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const data = await TransactionService.getMyTransactions(filters);
      setTransactions(data.results);
      setPagination({ count: data.count, next: data.next, previous: data.previous });
    } catch (error) {
      console.error('Failed to load transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      const data = await TransactionService.getTransactionStatistics({ period: selectedPeriod });
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleFilterChange = (newFilters: TransactionFiltersType) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters({ page: 1 });
  };

  const formatCurrency = (value: string) => {
    return `₦${parseFloat(value).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
            <p className="text-gray-600">Track and manage all your transactions</p>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200 ">
            {[
              { label: 'Today', value: TransactionPeriodEnum.TODAY },
              { label: 'Week', value: TransactionPeriodEnum.WEEK },
              { label: 'Month', value: TransactionPeriodEnum.MONTH },
              { label: 'Year', value: TransactionPeriodEnum.YEAR },
            ].map((period) => (
              <button
                key={period.value}
                onClick={() => setSelectedPeriod(period.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedPeriod === period.value
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
                <div className="h-24"></div>
              </div>
            ))}
          </div>
        ) : stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Current Balance"
              value={formatCurrency(stats.current_balance)}
              subtitle={`${stats.overview.total_transactions} transactions`}
              icon={<DollarSign className="w-6 h-6 text-blue-600" />}
              colorClass="text-blue-600"
            />
            <StatsCard
              title="Total Inflow"
              value={formatCurrency(stats.cash_flow.total_inflow)}
              subtitle={`${stats.deposits.count} deposits`}
              icon={<ArrowDownLeft className="w-6 h-6 text-green-600" />}
              trend="up"
              colorClass="text-green-600"
            />
            <StatsCard
              title="Total Outflow"
              value={formatCurrency(stats.cash_flow.total_outflow)}
              subtitle={`${stats.withdrawals.count} withdrawals`}
              icon={<ArrowUpRight className="w-6 h-6 text-red-600" />}
              trend="down"
              colorClass="text-red-600"
            />
            <StatsCard
              title="Net Flow"
              value={formatCurrency(stats.cash_flow.net_flow)}
              subtitle={`${stats.fees.total_fees} in fees`}
              icon={<TrendingUp className="w-6 h-6 text-purple-600" />}
              trend={parseFloat(stats.cash_flow.net_flow) >= 0 ? 'up' : 'down'}
              colorClass="text-purple-600"
            />
          </div>
        )}

        {/* Filters */}
        <TransactionFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Transactions List */}
        <div className="bg-white rounded-xl border border-gray-200 ">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Transactions</h2>
              <p className="text-gray-600 text-sm">
                {pagination.count} total transactions
              </p>
            </div>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                    <div className="h-20"></div>
                  </div>
                ))}
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600">Try adjusting your filters or make your first transaction</p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() => setSelectedTransaction(transaction)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!loading && transactions.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => handlePageChange((filters.page || 1) - 1)}
                disabled={!pagination.previous}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-800 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <span className="text-gray-600 text-sm">
                Page {filters.page || 1}
              </span>

              <button
                onClick={() => handlePageChange((filters.page || 1) + 1)}
                disabled={!pagination.next}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 text-gray-800 rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionHistoryPage;