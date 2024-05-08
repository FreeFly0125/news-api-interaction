import { Router } from "express";
import { articleController } from "../controllers";
import { validateArticleRequest } from "../middleware";

const articleRouter = Router();

articleRouter.post(
  "/search",
  validateArticleRequest,
  articleController.searchArticles
);

export default articleRouter;
