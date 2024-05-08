import { Router } from "express";
import { articleController } from "../controllers";

const articleRouter = Router();

articleRouter.get("/", articleController.getArticles);
articleRouter.post("/search", articleController.searchArticles);

export default articleRouter;
