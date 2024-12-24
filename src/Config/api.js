import axios from "axios";
// API Base URL
export const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:3000";

const API = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

API.interceptors.request.use((config) => {
	const userInfo = localStorage.getItem("userInfo");
	const token = userInfo ? JSON.parse(userInfo).token : null;

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error.response?.data || error.message);
		return Promise.reject(error);
	}
);

export { API };
// API Headers
export const getHeaders = (token) => ({
	"Content-Type": "application/json",
	...(token && { Authorization: `Bearer ${token}` }),
});
