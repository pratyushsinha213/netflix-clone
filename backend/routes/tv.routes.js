import { Router } from "express";
import { getSimilarTvs, getTrendingTv, getTvByCategory, getTvDetails, getTvTrailers } from "../controllers/tv.controller.js";

const tvRouter = Router();

tvRouter.get('/trending', getTrendingTv);
tvRouter.get('/:id/trailers', getTvTrailers);
tvRouter.get('/:id/details', getTvDetails);
tvRouter.get('/:id/similar', getSimilarTvs);
tvRouter.get('/:category', getTvByCategory);

export default tvRouter;