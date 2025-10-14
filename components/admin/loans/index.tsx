import React from "react";
import LoanDetailsHeader from "./LoanDetailsHeader";
import RepaymentScheduleTable from "./RepaymentScheduleTable";
import LoanDetailsActions from "./LoanDetailsAction";
import DisbursementQueue from "./DisbursementQueue";
import PenaltyManagement from "./PenaltyManagement";

interface LoanDetailsProps {
  loanId: string;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({ loanId }) => {
  const repaymentSchedule = [
    { dueDate: "2024-08-15", amount: "₦450", penalty: "₦25" },
    { dueDate: "2024-09-15", amount: "₦450", penalty: "₦0" },
    { dueDate: "2024-10-15", amount: "₦450", penalty: "₦0" },
    { dueDate: "2024-11-15", amount: "₦450", penalty: "₦0" },
    { dueDate: "2024-12-15", amount: "₦450", penalty: "₦0" },
  ];

  const disbursementQueue = [
    { user: "Ethan Bennett", amount: "₦10,000", approvedDate: "2024-07-16" },
    { user: "Ava Foster", amount: "₦12,000", approvedDate: "2024-07-02" },
    { user: "Liam Harper", amount: "₦7,500", approvedDate: "2024-07-06" },
  ];

  const penalties: {
    user: string;
    loanId: string;
    penaltyAmount: string;
    status: "Late" | "On Time";
  }[] = [
    {
      user: "Ethan Bennett",
      loanId: "LN-2024-002",
      penaltyAmount: "₦50",
      status: "Late",
    },
    {
      user: "Ava Foster",
      loanId: "LN-2024-005",
      penaltyAmount: "₦25",
      status: "On Time",
    },
  ];

  return (
    <>
      <LoanDetailsHeader
        amount="₦10,000"
        tenure="24 months"
        interestRate="8.5%"
        creditScore={720}
      />
      <RepaymentScheduleTable schedule={repaymentSchedule} />
      <LoanDetailsActions />
      <DisbursementQueue queue={disbursementQueue} />
      <PenaltyManagement penalties={penalties} />
    </>
  );
};

export default LoanDetails;
