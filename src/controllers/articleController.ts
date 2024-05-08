import { Request, Response } from "express";
import { ArticleInfoRequest } from "../types";
import axios from "axios";

export const searchArticles = async (req: Request, res: Response) => {
  const newReq: ArticleInfoRequest = req.body;

  const gnews_url = process.env.GNEWS_ENDPOINT;
  const q_api_key = `apikey=${process.env.GNEWS_API_KEY}`;

  // const q_counts = `&max=${newReq.counts}`;
  const q_title = newReq.title ? `(${newReq.title})` : "";
  const q_author = newReq.author ? `(${newReq.author})` : "";
  const q_keywords = `(${newReq.keywords.split(", ").join(" OR ")})`;

  let q_query =
    "&q=" + [q_title, q_author, q_keywords].filter(Boolean).join(" AND ");

  const fetch_data_url = `${gnews_url}?${q_api_key}${q_query}`;

  try {
    const articleRes = await axios.get(fetch_data_url);
    console.log (articleRes.data);
  } catch (err) {
    console.log ("Error: ", err);
  }

  res.status(200).send(fetch_data_url);
};
