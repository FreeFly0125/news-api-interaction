import { Router } from "express";
import articleRouter from "./articleRoute";

const appRouter = Router();

appRouter.use("/articles", articleRouter);

export default appRouter;
