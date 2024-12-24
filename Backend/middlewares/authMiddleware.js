import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization?.startsWith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findById(decoded.id).select("-password");
			if (!user) {
				res.status(401);
				throw new Error("User not found");
			}

			req.user = user;
			next();
		} catch (error) {
			console.error("Auth Error:", error);
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token provided");
	}
});

export default protect;
