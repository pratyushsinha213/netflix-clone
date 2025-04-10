import bcrypt from 'bcrypt';

import User from "../models/user.model.js";
import { generateTokenandSetCookie } from '../utils/generateToken.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
                success: false
            });
        }

        const findUserIfExistsByEmail = await User.findOne({ email });
        if (findUserIfExistsByEmail) {
            return res.status(400).json({
                message: "Email already exists",
                success: false
            });
        }

        const findUserIfExistsByUsername = await User.findOne({ username });
        if (findUserIfExistsByUsername) {
            return res.status(400).json({
                message: "Username already exists",
                success: false
            });
        }

        const profilePics = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const image = profilePics[Math.floor(Math.random() * profilePics.length)];

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error hashing password",
                        success: false
                    });
                }
                const user = await User.create({
                    username,
                    email,
                    password: hashedPassword,
                    image
                });

                if (user) {
                    generateTokenandSetCookie(user._id, res);
                    return res.status(201).json({
                        message: "User created successfully.",
                        success: true,
                        user: {
                            ...user._doc,
                            password: undefined
                        }
                    });
                }
            });
        });


    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in register controller: ${error.message}`,
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        generateTokenandSetCookie(user._id, res);
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            user: {
                ...user._doc,
                password: undefined
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in login controller: ${error.message}`,
            success: false
        });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie('token-netflix');
        return res.status(200).json({
            message: "User logged out successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in logout controller: ${error.message}`,
            success: false
        });
    }
}

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json({
            message: "User is authenticated",
            success: true,
            user: req.user
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in checkAuth controller: ${error.message}`,
            success: false
        });
    }
}