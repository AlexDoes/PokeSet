const BASE_URL = "http://localhost:8080/api";

export const apiService = {
  setAuthHeader: (headers = {}) => {
    const token = localStorage.getItem("token");
    if (token) {
      return {
        ...headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    return {
      ...headers,
      "Content-Type": "application/json",
    };
  },

  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: apiService.setAuthHeader(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Response error:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(errorData?.message || "Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", {
        endpoint,
        error: error.message,
        headers: apiService.setAuthHeader(),
      });
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: apiService.setAuthHeader(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Response error:", {
          status: response.status,
          statusText: response.statusText,
          errorData,
        });
        throw new Error(errorData?.message || "Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", {
        endpoint,
        error: error.message,
        data,
      });
      throw error;
    }
  },
};
