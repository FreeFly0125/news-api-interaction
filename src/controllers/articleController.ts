import { Request, Response } from "express";
import { ArticleInfoRequest } from "../types";

export const searchArticles = (req: Request, res: Response) => {
  const newReq: ArticleInfoRequest = req.body;
  res.status(200).send(newReq);
};
