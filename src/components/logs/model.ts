import { Schema } from "mongoose";
import { mongoose } from "../../services/mongodb";
import { ExerciseModel } from "../exercises/model";

const LogSchema = new Schema({
	username: String,
	count: Number,
	log: [
		{
			description: String,
			duration: Number,
			date: Date,
		},
	],
});

export class LogModel {
	private logModel;
	private exerciseModel;

	constructor() {
		this.logModel = mongoose.model("Logs", LogSchema);
		this.exerciseModel = new ExerciseModel();
	}

	async getUserLogs(userId: string, limit: number | null) {
		try {
			const exercises = await this.exerciseModel.getExercisesByUserId(
				userId,
				limit
			);

			return exercises;
		} catch (error) {
			throw "Invalid User";
		}
	}
}
