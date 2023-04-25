import { Router } from "express";
import { getLogsController } from "./controller";

export const logRouter = Router();

logRouter.get("/users/:id/logs", getLogsController);
