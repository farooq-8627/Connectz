// import express from "express";
// import cors from "cors";
// import ejsMate from "ejs-mate";
// import { join } from "path";
// import methodOverride from "method-override";
// import connectDB from "./Authentication/connectDB.js";
// import cookieParser from "cookie-parser";
// import userRouter from "./routes/userRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
// import messageRoutes from "./routes/messageRoutes.js";
// import { config } from "dotenv";
// import notFound from "./middlewares/notFound.js";
// import errorHandler from "./middlewares/errorMiddleware.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// const port = process.env.PORT || 3000;

// connectDB();
// config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.set("view-engine", "ejs");
// app.set("views", join(__dirname, "views"));
// app.engine("ejs", ejsMate);

// app.use(express.static(join(__dirname, "/public")));
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(express.json()); // Parse JSON bodies
// app.use(methodOverride("_method"));
// app.use(cookieParser("secretcode"));
// app.use(cors());

// app.use("/user", userRouter);
// app.use("/chat", chatRoutes);
// app.use("/message", messageRoutes);

// app.use(notFound);
// app.use(errorHandler);

// // const server = app.listen(port, () => {
// // 	console.log(`Server is listening on port: ${port}`);
// // });

// // const io = require("socket.io")(server, {
// // 	pingTimeout: 60000,
// // 	cors: {
// // 		origin: "http://localhost:3000",
// // 	},
// // });

// // io.on("connection", (socket) => {
// // 	console.log("connected to socket.io");
// // });

// // ---------------- Deployment ------------------
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname1, "/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname1,"..", "dist", "index.html"));
// 	});
// } else {
// 	app.get("/", (req, res) => {
// 		res.send("API is running....");
// 	});
// 	``;
// }

// import http from "http";
// import { Server } from "socket.io";

// const server = http.createServer(app);

// server.listen(port, () => {
// 	console.log(`Server is listening on port: ${port}`);
// });

// const io = new Server(server, {
// 	pingTimeout: 60000,
// 	cors: {
// 		origin: "http://localhost:3000",
// 	},
// });

// io.on("connection", (socket) => {
// 	socket.on("setup", (userData) => {
// 		socket.join(userData._id);
// 		socket.emit("connected");
// 	});

// 	socket.on("join chat", (room) => {
// 		socket.join(room);
// 		// console.log(`User joined Room : ${room}`);
// 	});

// 	socket.on("typing", (room) => {
// 		socket.in(room).emit("typing");
// 		console.log(room);
// 	});
// 	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

// 	socket.on("new message", (newMessageReceived) => {
// 		var chat = newMessageReceived.chat;

// 		if (!chat.users) return console.log("chat users not defined");

// 		chat.users.forEach((user) => {
// 			if (user._id == newMessageReceived.sender._id) return;

// 			socket.in(user._id).emit("message received", newMessageReceived);
// 		});
// 	});

// 	socket.off("setup", () => {
// 		console.log("USER DISCONNECTED");
// 		socket.leave(userData._id);
// 	});
// });

import express from "express";
import cors from "cors";
import ejsMate from "ejs-mate";
import { join } from "path";
import methodOverride from "method-override";
import connectDB from "./Authentication/connectDB.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { config } from "dotenv";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

// Configuration and Initialization
config();
connectDB();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up EJS for templating
app.set("view-engine", "ejs");
app.set("views", join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middleware setup
app.use(express.static(join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies
app.use(methodOverride("_method"));
app.use(cookieParser("secretcode"));
app.use(cors());

// Routes setup
app.use("/user", userRouter);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

// // Deployment setup
const __dirname1 = path.resolve();
if (process.env.NODE_ENV || "production" === "production") {
	app.use(express.static(path.join(__dirname1, "..", "dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname1, "..", "dist", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

// Setting up the server and Socket.IO
const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is listening on port: ${port}`);
});

const io = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
	console.log("Connected to socket.io");

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

	socket.on("stop typing", (room) => {
		socket.in(room).emit("stop typing");
	});

	socket.on("new message", (newMessageReceived) => {
		const chat = newMessageReceived.chat;

		if (!chat.users) return console.log("chat users not defined");

		chat.users.forEach((user) => {
			if (user._id === newMessageReceived.sender._id) return;

			socket.in(user._id).emit("message received", newMessageReceived);
		});
	});

	socket.off("setup", () => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id);
	});
});
