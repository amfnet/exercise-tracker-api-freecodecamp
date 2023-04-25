import { Request, Response } from "express";
import { getLogsService } from "./service";
import { responseData } from "../../helpers/response";

export const getLogsController = (req: Request, res: Response) => {
	const { id } = req.params;
	const { from, to, limit } = req.query;

	getLogsService(id)
		.then((data) => {
			responseData(res, data, 200);
		})
		.catch((err) => {
			res.send(err);
		});
};
