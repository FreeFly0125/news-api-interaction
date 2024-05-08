import { createClient } from "redis";

export const redisClient = createClient({ url: "redis://redis-server:6379" });
