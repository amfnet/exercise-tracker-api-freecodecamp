import { Router } from "express";
import { userRouter } from "../components/users/routes";
import { exerciseRouter } from "../components/exercises/routes";
import { logRouter } from "../components/logs/routes";

export const router = Router();

router.use("/api", userRouter);
router.use("/api", exerciseRouter);
router.use("/api", logRouter);
