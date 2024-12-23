import mongoose, { connect } from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoConnect from "connect-mongo";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;
const dbUrl = process.env.MONGO_URI;
const store = mongoConnect.create({
	mongoUrl: dbUrl,
	crypto: {
		secret: secret,
	},
	touchAfter: 24 * 3600,
});
store.on("error", (err) => {
	console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
	store,
	secret: secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
		httpOnly: true,
	},
};
export default { sessionOptions };
