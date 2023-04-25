import { Request, Response } from "express";
import { saveExercise } from "./service";
import { responseData } from "../../helpers/response";

export function postExercise(req: Request, res: Response) {
	const { description, duration, date } = req.body;
	const { id } = req.params;
	saveExercise({
		user: id,
		description,
		duration: Number(duration),
		date,
	})
		.then((data) => {
			//console.log(data);
			responseData(res, data, 200);
		})
		.catch((error) => {
			if (typeof error == "string")
				responseData(res, null, 404, new Error(error));
			if (error instanceof Error) responseData(res, null, 404, error);
			console.log(error);
		});
}
