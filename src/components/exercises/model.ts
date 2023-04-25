import { Schema, Types } from "mongoose";
import { mongoose } from "../../services/mongodb";
import { ExerciseInterface } from "./interfaces";
import { UserModelCreator } from "../users/model";

const ExerciseSchema = new Schema({
	user: {
		type: Types.ObjectId,
		require: true,
		ref: "users",
	},
	description: {
		type: String,
		require: true,
	},
	duration: {
		type: Number,
		require: true,
	},
	date: Date,
});

export class ExerciseModel {
	private exercisesModel;

	constructor() {
		this.exercisesModel = mongoose.model("Exercises", ExerciseSchema);
	}

	async saveExercise(
		data: Omit<ExerciseInterface, "_id">
	): Promise<Partial<ExerciseInterface> | null | any> {
		try {
			const doc = await this.exercisesModel.create({
				...data,
			});

			const exercise = await this.getExerciseById(doc._id.toString());

			if (exercise?._id == undefined) throw new Error("User not exist");

			return {
				_id: exercise._id.toString(),
				user: exercise.user,
				description: exercise.description,
				duration: exercise.duration,
				date: exercise.date,
			};
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getExercisesByUserId(userId: string, limit: number | null = null) {
		try {
			const query = this.exercisesModel.find({ user: userId }).populate({
				path: "user",
				model: UserModelCreator.instance().usersModel,
			});

			/*if (from) {
				query.where({ date: { $gte: from } });
			}

			if (to) {
				query.where({ date: { $lte: to } });
			}*/

			if (limit) {
				query.limit(limit);
			}

			const exercises = await query;

			return exercises;
		} catch (error) {
			throw error;
		}
	}

	async getExerciseById(exerciseId: string) {
		try {
			const exercise = await this.exercisesModel
				.findById(exerciseId)
				.populate({
					path: "user",
					model: UserModelCreator.instance().usersModel,
				});

			return exercise;
		} catch (error) {
			throw error;
		}
	}
}
