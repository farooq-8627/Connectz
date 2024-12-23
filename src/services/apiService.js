import { API_BASE_URL } from "../config/api";

export const fetchFromAPI = async (endpoint, options = {}) => {
	try {
		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("API call failed:", error);
		throw error;
	}
};
