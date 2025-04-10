import { fetchFromTMDB } from "../lib/tmdb.services.js";
import User from "../models/user.model.js";

export const searchPerson = async (req, res) => {
    const { query } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if (data.results.length === 0) {
            return res.status(404).json({
                message: "Person not found",
                success: false
            });
        }

        // Update the search history array in the user model
        await User.findOneAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });
        return res.status(200).json({
            message: "Person fetched successfully",
            success: true,
            content: data.results
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in searchPerson controller: ${error.message}`,
            success: false
        });
    }
}
export const searchMovie = async (req, res) => {
    const { query } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if (data.results.length === 0) {
            return res.status(404).json({
                message: "Movie not found",
                success: false
            });
        }

        // Update the search history array in the user model
        await User.findOneAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });
        return res.status(200).json({
            message: "Movie fetched successfully",
            success: true,
            content: data.results
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in searchMovie controller: ${error.message}`,
            success: false
        });
    }
}
export const searchTv = async (req, res) => {
    const { query } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if (data.results.length === 0) {
            return res.status(404).json({
                message: "Tv not found",
                success: false
            });
        }

        // Update the search history array in the user model
        await User.findOneAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });
        return res.status(200).json({
            message: "Movie fetched successfully",
            success: true,
            content: data.results
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in searchTv controller: ${error.message}`,
            success: false
        });
    }
}

export const getSearchHistory = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Search history fetched successfully",
            success: true,
            content: req.user.searchHistory
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in getSearchHistory controller: ${error.message}`,
            success: false
        });
    }
}

export const deleteItemFromSearchHistory = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findOneAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: parseInt(id)
                }
            }
        });

        return res.status(200).json({
            message: "Item deleted from search history successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in deleteItemFromSearchHistory controller: ${error.message}`,
            success: false
        });
    }
}