import axios from "axios";
import { ArticleInfo } from "../types";

export const fetchArticles = async (url: string) => {
  try {
    const articles: ArticleInfo[] = (await axios.get(url)).data.articles;
    return articles;
  } catch (err) {
    throw err;
  }
};
