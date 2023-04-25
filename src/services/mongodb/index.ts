import { Mongoose } from "mongoose";
import { config } from "../../config/env.testing.config";

export const mongoose = new Mongoose();

mongoose.Promise = globalThis.Promise;

export const connectDB = async () => {
	try {
		await mongoose.connect(config.db.uri);
		console.log("[db] CONNECTED");
	} catch (error) {
		throw new Error((error as Error).message || "Error: " + error);
	}
};
