import { Router } from "express";
const searchRouter = Router();

import { deleteItemFromSearchHistory, getSearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/search.controller.js";

searchRouter.get('/person/:query', searchPerson);
searchRouter.get('/movie/:query', searchMovie);
searchRouter.get('/tv/:query', searchTv);

searchRouter.get('/history', getSearchHistory);
searchRouter.delete('/history/:id', deleteItemFromSearchHistory);

export default searchRouter;