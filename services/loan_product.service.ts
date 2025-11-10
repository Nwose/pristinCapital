// import { send } from "./base";

// const _ = undefined;

// export async function getLoanProducts(token: string) {
//   const url = "loan-product/";
//   return await send("GET", url, _, token);
// }

// export async function createLoanProduct(data: any, token: string) {
//   const url = "loan-product/";
//   return await send("POST", url, data, token);
// }

// export async function updateLoanProduct(id: string, data: any, token: string) {
//   const url = `loan-product/${id}/`;
//   return await send("PUT", url, data, token);
// }

// export async function deleteLoanProduct(id: string, token: string) {
//   const url = `loan-product/${id}/`;
//   return await send("DELETE", url, _, token);
// }

import { makeRequest } from "./base";

export interface LoanProduct {
  id?: string;
  name: string;
  interest_rate: number;
  max_amount: number;
  tenure_months: number;
  description?: string;
  [key: string]: any; // for any extra fields
}

// ✅ Get all loan products
export async function getLoanProducts(
  token: string
): Promise<LoanProduct[] | { results: LoanProduct[] }> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return makeRequest("loan-product/", "GET", undefined, headers);
}

// ✅ Create a new loan product
export async function createLoanProduct(
  data: LoanProduct,
  token: string
): Promise<LoanProduct> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return makeRequest("loan-product/", "POST", data, headers);
}

// ✅ Update an existing loan product
export async function updateLoanProduct(
  id: string,
  data: Partial<LoanProduct>,
  token: string
): Promise<LoanProduct> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return makeRequest(`loan-product/${id}/`, "PUT", data, headers);
}

// ✅ Delete a loan product
export async function deleteLoanProduct(
  id: string,
  token: string
): Promise<{ message: string }> {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return makeRequest(`loan-product/${id}/`, "DELETE", undefined, headers);
}

export async function getAllLoanProducts() {
  try {
    const response = await makeRequest("loan-product/", "GET");
    return response?.results || [];
  } catch (error) {
    console.error("Error fetching loan products:", error);
    throw error;
  }
}

// ✅ Get loan product by ID
export async function getLoanProductById(id: string) {
  try {
    const response = await makeRequest(`loan-product/${id}/`, "GET");
    return response;
  } catch (error) {
    console.error(`Error fetching loan product ${id}:`, error);
    throw error;
  }
}
