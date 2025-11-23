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

// ----------------------
//  📌 PLAN MANAGEMENT
// ----------------------

// Fetch all investment plans (loan products)
export async function getInvestmentPlans() {
  return await makeRequest("/api/v1/loan-product/", "GET");
}

// Create investment plan
export async function createInvestmentPlan(payload: any) {
  return await makeRequest("/api/v1/loan-product/", "POST", payload);
}

// Update investment plan
export async function updateInvestmentPlan(id: string, payload: any) {
  return await makeRequest(`/api/v1/loan-product/${id}/`, "PUT", payload);
}

// Delete investment plan
export async function deleteInvestmentPlan(id: string) {
  return await makeRequest(`/api/v1/loan-product/${id}/`, "DELETE");
}

// Get investment config
export async function getInvestmentConfig() {
  return await makeRequest("/api/v1/loan-product/get_config/", "GET");
}

// ----------------------
//  📌 USER INVESTMENTS
// ----------------------
export async function getAllUserInvestments() {
  return await makeRequest("/api/v1/investment/just_testing/", "GET");
}

// ----------------------
//  📌 MATURITY DATA (TEMP)
// ----------------------
export async function getMaturityInvestments() {
  return await makeRequest("/api/v1/investment/just_testing/", "GET");
}
