import dotenv from "dotenv";
import express, { NextFunction } from "express";
import { Logger } from "./utils";
import cors from "cors";
import appRouter from "./routes";
import { redisClient } from "./config";
import { REDIS_FAIL, RUNNING_SERVER_FAIL, RUNNING_SERVER_SUCCESS } from "./consts/messages";

dotenv.config();

const app = express();
const VERSION = "v1";

app
  .use(cors())
  .use(express.json())
  .use("/health", (_req, res) => res.send("OK"))
  .use(`/api/${VERSION}`, appRouter);

const PORT = process.env.PORT || 4000;

const redisSetup = async (next: NextFunction) => {
  try {
    await redisClient.connect();
    next();
  } catch (err) {
    Logger.error(REDIS_FAIL, err);
  }
};

redisSetup(() => {
  try {
    app.listen(PORT, () => {
      Logger.info(RUNNING_SERVER_SUCCESS, PORT);
    });
  } catch (err) {
    Logger.error(RUNNING_SERVER_FAIL, err);
  }
});

export default app;
