import { Request, Response } from "express";
import { ArticleInfo, ArticleInfoRequest } from "../../types";
import axios from "axios";
import { fetchArticles } from "../../services";
import { build_fetch_article_query } from "./articleOperations";

export const searchArticles = async (req: Request, res: Response) => {
  const newReq: ArticleInfoRequest = req.body;
  const fetch_data_url = build_fetch_article_query(newReq);

  try {
    const articles = await fetchArticles(fetch_data_url);

    const filteredArticles = articles.filter((article: ArticleInfo) => {
      if (
        newReq.title &&
        !article.title.toLowerCase().includes(newReq.title.toLowerCase())
      )
        return false;
      if (
        newReq.author &&
        !article.source.name.toLowerCase().includes(newReq.author.toLowerCase())
      )
        return false;
      return true;
    });

    res.status(200).send(filteredArticles.slice(0, newReq.counts));
  } catch (err: any) {
    res.status(err.status).send(err.body);
  }
};
