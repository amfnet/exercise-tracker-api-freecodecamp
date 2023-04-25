import { Request, Response } from "express";
import { getUsersService, saveUserService } from "./service";
import { responseData } from "../../helpers/response";

export function postUserController(req: Request, res: Response) {
	const { username } = req.body;

	if (typeof username == "string") {
		saveUserService(username)
			.then((data) => {
				responseData(res, data, 200);
			})
			.catch((err) => {
				responseData(res, null, 400, err);
			});
	}
}

export function getUsersController(req: Request, res: Response) {
	getUsersService()
		.then((data) => {
			responseData(res, data, 200);
		})
		.catch((err) => {
			responseData(res, null, 400, err);
		});
}
