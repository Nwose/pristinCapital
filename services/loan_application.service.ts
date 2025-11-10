import { makeRequest } from "./base";

export interface LoanApplication {
  id: string;
  user?: {
    email?: string;
    first_name?: string;
    last_name?: string;
  };
  amount: string | number;
  tenure: string | number;
  purpose: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at?: string;
}

// ✅ Get all loan applications
export async function getLoanApplications(): Promise<LoanApplication[]> {
  try {
    const data = await makeRequest("loan-application/", "GET");
    const list = Array.isArray(data) ? data : data.results || [];

    // normalize keys to match your UI
    return list.map((item: any) => ({
      id: item.id,
      user: item.user,
      amount: item.amount_requested, // match table
      tenure: item.tenure_months, // match table
      purpose: item.purpose,
      status: item.status,
      appliedDate: item.created_at,
    }));
  } catch (error) {
    console.error("❌ Error fetching loan applications:", error);
    throw error;
  }
}

// ✅ Get single loan application by ID
export async function getLoanApplicationById(
  id: string
): Promise<LoanApplication> {
  try {
    const data = await makeRequest(`loan-application/${id}/`, "GET");
    return data;
  } catch (error) {
    console.error(`❌ Error fetching loan application with ID ${id}:`, error);
    throw error;
  }
}

// ✅ Apply for a loan (corrected fields)

export async function applyForLoan(payload: {
  product_id: string; // ✅ backend expects this key
  amount_requested: number; // ✅ backend expects this key
  tenure_months: number; // ✅ backend expects this key
  purpose: string;
}) {
  return makeRequest("loan-application/", "POST", payload);
}
