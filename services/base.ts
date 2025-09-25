export const domain = `https://pristin-asxu.onrender.com/api/v1/`;

const ALLOWED_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

function strip(str: string, char: string = "/") {
  if (str.startsWith(char)) {
    str = str.slice(1);
  }
  if (str.endsWith(char)) {
    str = str.slice(0, -1);
  }

  return str;
}
export async function send(
  method: string,
  route: string,
  data?: any,
  token?: string,
  removeTrailingSlash: boolean = false
) {
  if (!ALLOWED_METHODS.includes(method)) {
    throw new Error("Invalid HTTP method");
  }
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let url = `${strip(domain)}/${strip(route)}/`;

  if (removeTrailingSlash) {
    url = url.slice(0, -1);
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return response;
  } catch (error) {
    console.error("Error making request:", error);
    throw error;
  }
}
