import dotenv from "dotenv";
import express, { NextFunction } from "express";
import { Logger } from "./utils";
import cors from "cors";
import appRouter from "./routes";

dotenv.config();

const app = express();
const VERSION = "v1";

app
  .use(cors())
  .use(express.json())
  .use("/health", (_req, res) => res.send("OK"))
  .use(`/api/${VERSION}`, appRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  Logger.info(`Server is runnong on Port ${PORT}.`);
});

export default app;
