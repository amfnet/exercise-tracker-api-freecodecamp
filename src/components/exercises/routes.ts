import { Router } from "express";
import { postExercise } from "./controller";

export const exerciseRouter = Router();

exerciseRouter.post("/users/:id/exercise", postExercise);
