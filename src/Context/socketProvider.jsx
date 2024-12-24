// SocketContext.js
import React, { createContext, useContext, useState } from "react";
import io from "socket.io-client";
import { API_BASE_URL } from "../config/api";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
	const socket = io(API_BASE_URL, {
		withCredentials: true,
		transports: ["websocket"],
	});
	const [socketConnected, setSocketConnected] = useState(false);
	// const [isTyping, setIsTyping] = useState(false);
	// const [typing, setTyping] = useState(false);
	var selectedChatCompare;

	return (
		<SocketContext.Provider
			value={{
				socket,
				socketConnected,
				setSocketConnected,
				// isTyping,
				// setIsTyping,
				// typing,
				// setTyping,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

const useSocket = () => useContext(SocketContext);

export { SocketProvider, useSocket };
