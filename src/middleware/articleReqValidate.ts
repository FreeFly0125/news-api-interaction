import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const ArticleReqSchema = z.object({
  counts: z.number().min(1, "Number of articles should not be 0."),
  title: z.string().min(3, "Title must have at least 3 characters.").optional(),
  author: z.string().min(3, "Author must have at least 3 characters.").optional(),
  keywords: z.string().optional(),
});

export const validateArticleRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = ArticleReqSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    next(err);
  }
};
