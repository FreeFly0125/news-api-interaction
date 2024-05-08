import { Request, Response } from "express";
import { ArticleInfo, ArticleInfoRequest } from "../types";
import axios from "axios";

export const searchArticles = async (req: Request, res: Response) => {
  const newReq: ArticleInfoRequest = req.body;

  const gnews_url = process.env.GNEWS_ENDPOINT;
  const q_api_key = `apikey=${process.env.GNEWS_API_KEY}`;
  const q_category = newReq.category
    ? `category=${newReq.category}`
    : undefined;
  const q_lang = newReq.lang ? `lang=${newReq.lang}` : undefined;
  const q_country = newReq.country ? `country=${newReq.country}` : undefined;

  // const q_counts = `&max=${newReq.counts}`;
  const q_title = newReq.title ? `(${newReq.title})` : "";
  const q_author = newReq.author ? `(${newReq.author})` : "";
  const q_keywords = `(${newReq.keywords.split(", ").join(" OR ")})`;

  let q_query =
    "q=" + [q_title, q_author, q_keywords].filter(Boolean).join(" AND ");

  const fetch_data_url = `${gnews_url}?${[
    q_api_key,
    q_category,
    q_lang,
    q_country,
    q_query,
  ]
    .filter(Boolean)
    .join("&")}`;

  try {
    const articles: ArticleInfo[] = (await axios.get(fetch_data_url)).data
      .articles;

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
