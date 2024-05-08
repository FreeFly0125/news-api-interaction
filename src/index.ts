import dotenv from "dotenv";
import express, { NextFunction } from "express";
import { Logger } from "./utils";
import cors from "cors";

dotenv.config();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/health", (_req, res) => res.send("OK"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    Logger.info(`Server is runnong on :${PORT}.`);
})  

export default app;