import { Router } from "express";
const authRouter = Router();

import { register, login, logout, checkAuth } from "../controllers/auth.controller.js";
import { isAuthorized } from "../middlewares/isAuthorized.js";

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/check-auth', isAuthorized, checkAuth);

export default authRouter;