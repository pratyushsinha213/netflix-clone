import { fetchFromTMDB } from "../lib/tmdb.services.js"

export const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        return res.status(200).json({
            message: "Trending movies fetched successfully",
            success: true,
            content: randomMovie
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in getTrendingMovies controller: ${error.message}`,
            success: false
        });
    }
}

export const getMovieTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        return res.status(200).json({
            message: "Movie trailers fetched successfully",
            success: true,
            trailers: data.results
        })
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({
                message: "Movie not found",
                success: false
            });
        }
        return res.status(500).json({
            message: `Internal server error in getMovieTrailers controller: ${error.message}`,
            success: false
        });
    }
}

export const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        return res.status(200).json({
            message: "Movie details fetched successfully",
            success: true,
            details: data
        })
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({
                message: "Movie not found",
                success: false
            });
        }
        return res.status(500).json({
            message: `Internal server error in getMovieDetails controller: ${error.message}`,
            success: false
        });
    }
}

export const getSimilarMovies = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({
            message: "Similar movies fetched successfully",
            success: true,
            similarContent: data
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({
                message: "Movie not found",
                success: false
            });
        }
        return res.status(500).json({
            message: `Internal server error in getSimilarMovies controller: ${error.message}`,
            success: false
        });
    }
}

export const getMovieByCategory = async (req, res) => {
    const { category } = req.params;
    
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        return res.status(200).json({
            message: "Movies fetched successfully",
            success: true,
            content: data.results
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }
        return res.status(500).json({
            message: `Internal server error in getMovieByCategory controller: ${error.message}`,
            success: false
        });
    }
}