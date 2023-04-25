import { UserInterface } from "../users/interfaces";
import { UserModelCreator } from "../users/model";
import { ExerciseInterface } from "./interfaces";
import { ExerciseModel } from "./model";

const exerciseModel: ExerciseModel = new ExerciseModel();
const userModel = UserModelCreator.instance();

export async function saveExercise(
	data: Omit<ExerciseInterface, "_id">
): Promise<
	| (Omit<ExerciseInterface, "user" | "date"> & {
			username: ExerciseInterface["user"];
			date: string | undefined;
	  })
	| null
> {
	if (!data.user || !data.description || !data.duration) {
		throw "Incomplete Data";
	}

	if (!data.date) {
		data.date = new Date();
	}

	try {
		const user = await userModel.getUser(data.user);

		if (user == null) throw new Error("User not exist");

		const res: ExerciseInterface = await exerciseModel.saveExercise(data);

		return {
			_id: res.user._id,
			username: res.user.username,
			description: res.description,
			duration: res.duration,
			date: res.date?.toDateString(),
		};
	} catch (error) {
		throw error;
	}
}
