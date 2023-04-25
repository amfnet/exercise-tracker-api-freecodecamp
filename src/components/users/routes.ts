import { Router } from "express";
import { getUsersController, postUserController } from "./controller";

export const userRouter = Router();

userRouter.post("/users", postUserController);
userRouter.get("/users", getUsersController);
