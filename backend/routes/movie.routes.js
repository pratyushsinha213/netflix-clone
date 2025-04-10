import { Router } from "express";
import { getMovieByCategory, getMovieDetails, getMovieTrailers, getSimilarMovies, getTrendingMovie } from "../controllers/movie.controller.js";

const movieRouter = Router();

movieRouter.get('/trending', getTrendingMovie);
movieRouter.get('/:id/trailers', getMovieTrailers);
movieRouter.get('/:id/details', getMovieDetails);
movieRouter.get('/:id/similar', getSimilarMovies);
movieRouter.get('/:category', getMovieByCategory);

export default movieRouter;