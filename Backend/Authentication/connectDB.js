import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbUrl = process.env.MONGO_URI;
const connectDB = async () => {
	try {
		await mongoose.connect(dbUrl);
		console.log(`MongoDB connected`);
	} catch (error) {
		console.log(`Error: ${error}`);
		process.exit();
		// ``;
	}
};
export default connectDB;
