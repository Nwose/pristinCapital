import { makeRequest } from "./base";
import { toast } from "react-toastify";

// All investment products (real ones coming soon, this is test for now)
export async function getInvestmentProducts() {
  const result = await makeRequest("/api/v1/investment/just_testing/", "GET");
  // Return empty array if the endpoint doesn't exist yet
  return result || [];
}

// User's wallets + investment balance
export async function getUserInvestments() {
  const result = await makeRequest("/api/v1/wallets/get_user_wallets/", "GET");
  // Return empty array if the endpoint doesn't exist yet
  return result || [];
}

// Fund wallet / Start new investment
export async function fundInvestment(payload: any) {
  const result = await makeRequest("/api/v1/wallets/fund/", "POST", payload);
  if (!result) {
    throw new Error("Failed to process investment");
  }
  return result;
}

// WITHDRAWAL — NOT READY YET (safe version)
export async function withdrawFunds(payload: any) {
  toast.error("Withdrawal is being finalized. Coming this week!");
  throw new Error("Withdrawal endpoint not available yet");
}
