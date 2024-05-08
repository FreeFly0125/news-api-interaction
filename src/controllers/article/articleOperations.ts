import { ArticleInfoRequest } from "../../types";
import crypto from "crypto";

export const build_fetch_article_query = (req: ArticleInfoRequest) => {
  const gnews_url = process.env.GNEWS_ENDPOINT;
  const q_api_key = `apikey=${process.env.GNEWS_API_KEY}`;
  const q_category = req.category ? `category=${req.category}` : undefined;
  const q_lang = req.lang ? `lang=${req.lang}` : undefined;
  const q_country = req.country ? `country=${req.country}` : undefined;

  const q_title = req.title ? `(${req.title})` : "";
  const q_author = req.author ? `(${req.author})` : "";
  const q_keywords = `(${req.keywords.split(", ").join(" OR ")})`;

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

  return fetch_data_url;
};

export const generate_cache_key = (req: ArticleInfoRequest) => {
  let countStr = req.counts.toString();

  let data = [
    req.title,
    req.author,
    req.keywords,
    req.category,
    req.lang,
    req.country,
  ]
    .filter(Boolean)
    .reduce((acc, val) => `${acc}${val}`, countStr);

  const hasher = crypto.createHash("sha1");
  hasher.update(String(data));
  return hasher.digest("hex");
};
