import { CalendarCheck2 } from "lucide-react";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  amount: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    type: "positive" | "negative" | "neutral";
    text: string;
  };
  hasAction?: boolean;
}

export default function DashboardCard({
  title,
  amount,
  subtitle,
  icon,
  trend,
  hasAction = false,
}: DashboardCardProps) {
  const trendColor =
    trend?.type === "positive"
      ? "text-[#019893]"
      : trend?.type === "negative"
      ? "text-red-600"
      : "text-blue-600";

  return (
    <div className="bg-white rounded-lg border border-teal-200 p-6 relative">
      {/* Top section */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-base font-semibold text-[#001B2E]">{title}</h3>
        {icon && <span className="text-[#001B2E] text-xl">{icon}</span>}
      </div>

      {/* Amount */}
      <p className="text-3xl font-extrabold text-gray-900 mb-4">{amount}</p>

      {/* Trend or subtitle */}
      {trend && (
        <div className="flex items-center gap-1">
          <span className={`font-semibold ${trendColor}`}>{trend.value}</span>
          <span className="text-gray-500 text-sm">{trend.text}</span>
        </div>
      )}

      {subtitle && !trend && (
        <p className="text-sm text-[#019893] font-medium">{subtitle}</p>
      )}

      {/* Action icon */}
      {hasAction && (
        <CalendarCheck2 className="absolute bottom-6 right-6 text-[#001B2E] w-5 h-5" />
      )}
    </div>
  );
}
