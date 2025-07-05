import DashboardCard from "../../components/dashboard/DashboardCard";
import UpcomingPayments from "../../components/dashboard/UpcomingPayments";
import QuickSettings from "../../components/dashboard/QuickSettings";
import { TrendingUp, FileText, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <DashboardCard
          title="Investment Balance"
          amount="₦23,680,540"
          trend={{
            value: "+6.1%",
            type: "positive",
            text: "from last month",
          }}
          icon={<TrendingUp className="w-6 h-6" />}
          hasAction={true}
        />
        <DashboardCard
          title="Loan Status"
          amount="₦8,500,200"
          subtitle="Active Next due 2025-06-15"
          icon={<FileText className="w-6 h-6" />}
          hasAction={true}
        />
        <DashboardCard
          title="Wallet Balance"
          amount="₦3,490,780"
          subtitle="Updated 2025-05-19"
          icon={<Wallet className="w-6 h-6" />}
          hasAction={true}
        />
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 md:space-y-6">
        <UpcomingPayments />
        <QuickSettings />
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm py-4">
        © 2025 Fintech Dashboard
      </div>
    </div>
  );
}
