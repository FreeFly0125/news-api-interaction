import { Request, Response } from "express";
import { ArticleInfo, ArticleInfoRequest } from "../../types";
import { fetchArticles } from "../../services";
import { build_fetch_article_query, generate_cache_key } from "./articleOperations";
import { redisClient } from "../../config";

export const searchArticles = async (req: Request, res: Response) => {
  const newReq: ArticleInfoRequest = req.body;
  const fetch_data_url = build_fetch_article_query(newReq);
  const cache_key = generate_cache_key(newReq);

  await redisClient.connect();
  const cachedData = await redisClient.get(cache_key);

  if (cachedData) {
    return res.status(200).send(JSON.parse(cachedData));
  }

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

    const result = filteredArticles.slice(0, newReq.counts);
    await redisClient.setEx(cache_key, 3600, JSON.stringify(result))
    res.status(200).send(result);
  } catch (err: any) {
    res.status(err.status).send(err.body);
  }
};
