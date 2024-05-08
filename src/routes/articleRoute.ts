import { Router } from "express";
import { articleController } from "../controllers";

const articleRouter = Router();

articleRouter.post("/search", articleController.searchArticles);

export default articleRouter;
