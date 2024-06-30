// Importing Cookies from "js-cookie" to handle cookies
import Cookies from "js-cookie";

// Base URL for the API
const API_BASE_URL = "https://v2.api.noroff.dev";

// API endpoints
export const API_LISTINGS = `${API_BASE_URL}/auction/listings`;
export const API_PROFILE = `${API_BASE_URL}/auction/profiles`;
export const API_REGISTER = `${API_BASE_URL}/auth/register`;
export const API_LOGIN = `${API_BASE_URL}/auth/login`;
export const API_KEY = `${API_BASE_URL}/auth/create-api-key`;

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  body: { [key: string]: any } | null = null
) {
  const accessToken = Cookies.get("accessToken");
  const apiKey = Cookies.get("SalmonKey");

  const options = {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey || "",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(endpoint, options);
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      console.error("Request Error:", data); // Log detailed error information
      throw new Error(`An error has occurred: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error; // Rethrow the error for further handling
  }
}
