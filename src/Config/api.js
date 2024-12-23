// API Base URL
export const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:3000";

// API Endpoints
export const ENDPOINTS = {
	// Auth endpoints
	AUTH: {
		LOGIN: "/user/login",
		SIGNUP: "/user/signup",
		UPDATE_PROFILE: "/user/updateProfile",
	},

	// Chat endpoints
	CHAT: {
		GET_CHATS: "/chat",
		CREATE_GROUP: "/chat/group",
		RENAME_GROUP: "/chat/rename",
		UPDATE_DESCRIPTION: "/chat/updateDescription",
		ADD_TO_GROUP: "/chat/groupadd",
		REMOVE_FROM_GROUP: "/chat/groupremove",
		GET_COMMUNITIES: "/chat/communities",
	},

	// Message endpoints
	MESSAGE: {
		SEND: "/message",
		GET_ALL: "/message",
	},

	// User endpoints
	USER: {
		SEARCH: "/user",
	},
};

// API Headers
export const getHeaders = (token) => ({
	"Content-Type": "application/json",
	...(token && { Authorization: `Bearer ${token}` }),
});
