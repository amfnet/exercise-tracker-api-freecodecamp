import { Request, Response } from "express";
import { getLogsService } from "./service";
import { responseData } from "../../helpers/response";

export const getLogsController = (req: Request, res: Response) => {
	const { id } = req.params;
	let { from, to, limit }: any = req.query;

	if (typeof from == "string") from = new Date(from);
	if (typeof to == "string") to = new Date(to);
	if (limit) limit = Number(limit);
	else limit = null;

	getLogsService(id, from, to, limit)
		.then((data) => {
			responseData(res, data, 200);
		})
		.catch((err) => {
			res.send(err);
		});
};
