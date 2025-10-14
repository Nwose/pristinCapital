import React from "react";

interface LoanDetailsActionsProps {
  onApproveReject?: () => void;
  onDisburse?: () => void;
  onAddPenalty?: () => void;
}

const LoanDetailsActions: React.FC<LoanDetailsActionsProps> = ({
  onApproveReject,
  onDisburse,
  onAddPenalty,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={onApproveReject}
        className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-md transition"
      >
        Approve/Reject
      </button>
      <button
        onClick={onDisburse}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-md transition"
      >
        Disburse
      </button>
      <button
        onClick={onAddPenalty}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-md transition"
      >
        Add Penalty
      </button>
    </div>
  );
};

export default LoanDetailsActions;
