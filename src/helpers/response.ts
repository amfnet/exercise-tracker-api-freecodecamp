import { Response } from "express";
import { UserInterface } from "../components/users/interfaces";
import { ExerciseInterface } from "../components/exercises/interfaces";
import { LogsInterface } from "../components/logs/interfaces";

type UserDataResponse =
	| UserInterface
	| UserInterface[]
	| null
	| ExerciseInterface
	| LogsInterface;

export function responseData(
	res: Response,
	data: UserDataResponse,
	statusCode: number,
	err: Error | null = null
) {
	if (!err) {
		res.status(statusCode).json(data);
		return;
	}

	res.status(statusCode).json({ error: err.message, data });
}
