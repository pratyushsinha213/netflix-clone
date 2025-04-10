import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '../config/env.js';

export const generateTokenandSetCookie = (id, res) => {
    const token = jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie('token-netflix', token, {
        maxAge: 1*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV === "production",
    });
}