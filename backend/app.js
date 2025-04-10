import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();

import { CLIENT_URL, NODE_ENV, PORT } from './config/env.js';
import { isAuthorized } from './middlewares/isAuthorized.js';
import connectToDatabase from './database/mongoose.js';
import authRouter from './routes/auth.routes.js';
import movieRouter from './routes/movie.routes.js';
import tvRouter from './routes/tv.routes.js';
import searchRouter from './routes/search.routes.js';

const __dirname = path.resolve();

app.use(cors({
    origin: CLIENT_URL,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/movie', isAuthorized, movieRouter);
app.use('/api/v1/tv', isAuthorized, tvRouter);
app.use('/api/v1/search', isAuthorized, searchRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
  }

app.listen(PORT, () => {
    console.log(`Netflix Clone Backend running on http://localhost:${PORT}`);
    connectToDatabase();
});