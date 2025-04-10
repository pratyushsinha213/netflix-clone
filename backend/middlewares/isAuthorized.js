import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';

export const isAuthorized = async (req, res, next) => {
    try {
        const token_netflix = req.cookies['token-netflix'];
        if (!token_netflix) {
            return res.status(401).json({
                message: "Unauthorized - No token provided.",
                success: false
            });
        }

        const decoded = jwt.verify(token_netflix, JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized - Invalid token.",
                success: false
            });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized - User not found.",
                success: false
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: `Error in isAuthorized middleware: ${error.message}`,
            success: false
        });
    }
}