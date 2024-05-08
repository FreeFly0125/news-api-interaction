export interface ArticleInfoRequest {
  counts: number,
  title?: string,
  author?: string,
  keywords: string,
  category?: CategoryKeys,
  lang?: string,
  country?: string,
}

export enum CategoryKeys {
  General = "general",
  World = "world",
  Nation = "nation",
  Business = "business",
  Technology = "technology",
  Entertainment = "entertainment",
  Sports = "sports",
  Science = "science",
  Health = "health",
}

export interface ArticleSource {
  name: string,
  url: string,
}

export interface ArticleInfo {
  title: string,
  description: string,
  content: string,
  url: string,
  image: string,
  publishedAt: string,
  source: ArticleSource,
}
