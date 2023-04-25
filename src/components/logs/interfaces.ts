import { ExerciseInterface } from "../exercises/interfaces";

export interface LogsInterface {
	_id: string;
	username: string;
	count: number;
	log: Omit<ExerciseInterface, "_id" | "user">[];
}
