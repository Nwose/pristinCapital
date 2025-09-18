// src/services/api.ts

const BASE_URL = "https://pristin-asxu.onrender.com/api/v1";

// Helper to handle requests
async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json();
}

// =======================
// Auth
// =======================
export async function loginUser(email: string, password: string) {
  return request("/login/token/1stfactor/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export async function registerUser(userData: {
  email: string;
  password: string;
  name: string;
}) {
  return request("/users/register/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
}

// =======================
// User
// =======================
export async function getUserProfile(token: string) {
  return request("/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// =======================
// Wallets
// =======================
export async function getUserWallets(token: string) {
  return request("/wallets/get_user_wallets/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fundWallet(token: string, amount: number) {
  return request("/wallets/fund/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });
}

// =======================
// Files
// =======================
export async function uploadFile(token: string, file: File, thumbnail?: File) {
  const formData = new FormData();
  formData.append("file", file);
  if (thumbnail) formData.append("thumbnail", thumbnail);

  const res = await fetch(`${BASE_URL}/files/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("File upload failed");
  return res.json();
}
