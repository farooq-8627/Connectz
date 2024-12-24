import express from "express";
import cors from "cors";
import methodOverride from "method-override";
import connectDB from "./Authentication/connectDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { config } from "dotenv";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import requestLogger from "./middlewares/requestLogger.js";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
config();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: "*",
		credentials: true,
	},
});

// Socket.IO connection handling
io.on("connection", (socket) => {
	socket.on("setup", (userData) => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
	});

	socket.on("typing", (room) => {
		socket.in(room).emit("typing");
	});

	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new message", (newMessageReceived) => {
		const chat = newMessageReceived.chat;
		if (!chat.users) return;

		chat.users.forEach((user) => {
			if (user._id === newMessageReceived.sender._id) return;
			socket.in(user._id).emit("message received", newMessageReceived);
		});
	});

	socket.on("disconnect", () => {
		console.log("USER DISCONNECTED");
	});
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser("secretcode"));
app.use(requestLogger);

// MongoDB connection for production
app.use(async (req, res, next) => {
	try {
		if (mongoose.connection.readyState !== 1) {
			await connectDB();
		}
		next();
	} catch (error) {
		console.error("Database connection error:", error);
		res.status(500).json({ error: "Database connection failed" });
	}
});

// Routes
app.get("/", (req, res) => {
	res.json({ status: "success", message: "Welcome to Connectz API" });
});

app.use("/user", userRouter);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== "production") {
	const PORT = process.env.PORT || 3000;
	server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for serverless
export default async (req, res) => {
	if (!res.socket.server) {
		const io = new Server(server, {
			cors: {
				origin: "*",
				credentials: true,
			},
			path: "/socket.io/",
			addTrailingSlash: false,
			transports: ["websocket", "polling"],
		});

		// Set up your socket event handlers
		io.on("connection", (socket) => {
			socket.on("setup", (userData) => {
				socket.join(userData._id);
				socket.emit("connected");
			});

			socket.on("join chat", (room) => {
				socket.join(room);
			});

			socket.on("typing", (room) => {
				socket.in(room).emit("typing");
			});

			socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

			socket.on("new message", (newMessageReceived) => {
				const chat = newMessageReceived.chat;
				if (!chat.users) return;

				chat.users.forEach((user) => {
					if (user._id === newMessageReceived.sender._id) return;
					socket.in(user._id).emit("message received", newMessageReceived);
				});
			});

			socket.on("disconnect", () => {
				console.log("USER DISCONNECTED");
			});
		});

		res.socket.server = server;
	}

	if (req.url.startsWith("/socket.io/")) {
		res.socket.server.io.handle(req, res);
		return;
	}

	return app(req, res);
};
