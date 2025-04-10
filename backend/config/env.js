import { config } from "dotenv";

config({ path: `.env` });

export const {
    NODE_ENV, PORT, CLIENT_URL,
    MONGO_URI,
    JWT_SECRET,
    TMDB_READ_ACCESS_TOKEN
} = process.env;