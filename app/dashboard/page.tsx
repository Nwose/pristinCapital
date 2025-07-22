import DashboardCard from "../../components/dashboard/DashboardCard";
import UpcomingPayments from "../../components/dashboard/UpcomingPayments";
import QuickSettings from "../../components/dashboard/QuickSettings";
import { TrendingUp, FileText, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <div className="space-y-4 md:space-y-6 lg:space-y-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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
            icon={
              <img
                src="/images/icons/status.svg"
                alt="Calendar Icon"
                className="w-6 h-6"
              />
            }
            hasAction={true}
          />
          <DashboardCard
            title="Wallet Balance"
            amount="₦3,490,780"
            subtitle="Updated 2025-05-19"
            icon={
              <img
                src="/images/icons/wallet-icon.svg"
                alt="Calendar Icon"
                className="w-6 h-6"
              />
            }
            hasAction={true}
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 md:gap-6 lg:gap-8">
          <UpcomingPayments />
          <QuickSettings />
        </div>

        {/* Footer */}
      </div>
    </>
  );
}
