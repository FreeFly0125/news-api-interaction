# NEWS API

## Overview

### Project instructions

Your task is to create a simple API that interacts with a public news API for fetching articles. For the back-end, you can use the language and framework of your choice. For example, you can use the [GNews API](https://gnews.io) and then create your own API service, with documentation, that interacts with this API for fetching articles.

Your API should have a few basic methods like, fetching N news articles, finding a news article with a specific title or author, and searching by keywords. Include a cache in your API service as well so users are not fetching the same things over and over.

### Preparation

First, you need to create GNews API key for authorize to news API.

You just sign up to [GNews](https://gnews.io) and can get free API key for authentication. And store the API in `.env` file.

## Running the application.

Download the code base from [github](https://github.com/FreeFly0125/news-api-interaction.git).

```bash
git clone https://github.com/FreeFly0125/news-api-interaction.git
```

Then You can run the application with [Docker](https://docker.com).

```bash
docker-compose up --build
```

### Request Body

```
{
  counts: number;
  title?: string;
  author?: string;
  keywords: string;
  category?: string;
  lang?: string;
  country?: string;
}
```

The `counts` and `keywords` fields are required, else are optional.

#### e.g Request body:

```
{
    "counts": 20,
    "keywords": "basketball, football",
    "category": "sports",
    "lang": "en"
}
```

By using `Postman` or `curl`, you can check the API is working.

```bash
curl -X POST http://localhost:4000/api/v1/articles/search \
    -H "Content-Type: application/json" \
    -d '{
        "counts": 20,
        "keywords": "basketball, football",
        "category": "sports",
        "lang": "en"
    }'

```
