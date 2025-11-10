const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ✅ Original function — keep this so other pages don’t break
export async function send(
  method: string,
  endpoint: string,
  body?: any,
  token?: string
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Clean URL (avoid double slashes)
  const url = `${BASE_URL?.replace(/\/+$/, "")}/${endpoint.replace(
    /^\/+/,
    ""
  )}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // Handle 401 — token invalid or expired
  if (res.status === 401) {
    localStorage.removeItem("access_token");
    window.location.href = "/admin/login";
    throw new Error("Unauthorized. Please log in again.");
  }

  // Try parsing JSON (even on failure)
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || "Something went wrong";
    throw new Error(msg);
  }

  return data;
}

// ✅ New version — safer and typed (for loan products and debugging)
export async function makeRequest<T = any>(
  endpoint: string,
  method: string = "GET",
  body?: any,
  headers: Record<string, string> = {}
): Promise<T> {
  const fullUrl = `${BASE_URL?.replace(/\/+$/, "")}/${endpoint.replace(
    /^\/+/,
    ""
  )}`;

  // 🔑 Attach token automatically if it exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  console.log("🔗 Request URL:", fullUrl);

  const res = await fetch(fullUrl, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Request failed:", res.status, errorText);
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json() as Promise<T>;
}
