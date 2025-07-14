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
    <div className="bg-white rounded-lg border border-[#ccEaE9] p-4 sm:p-6 relative">
      {/* Top section */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-base font-semibold text-[#012638]">{title}</h3>
        {icon && <span className="text-[#001B2E] text-xl">{icon}</span>}
      </div>

      {/* Amount */}
      <p className="font-semibold text-[#00080B] text-2xl md:text-3xl mb-4 font-inter">
        {amount}
      </p>

      {/* Trend or subtitle */}
      {trend && (
        <div className="flex items-center gap-1">
          <span className="text-base text-[#019893] font-inter font-normal">
            {trend.value}
          </span>
          <span className="text-sm text-[#019893] font-inter font-normal">
            {trend.text}
          </span>
        </div>
      )}

      {subtitle && !trend && (
        <p className="text-sm text-[#019893] font-medium">{subtitle}</p>
      )}

      {/* Action icon */}
      {hasAction && (
        <CalendarCheck2 className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-[#001B2E] w-5 h-5" />
      )}
    </div>
  );
}
