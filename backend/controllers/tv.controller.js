import { fetchFromTMDB } from "../lib/tmdb.services.js"

export const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)]
        return res.status(200).json({
            message: "Trending TVs fetched successfully",
            success: true,
            content: randomTv
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error in getTrendingTv controller: ${error.message}`,
            success: false
        });
    }
}

export const getTvTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        return res.status(200).json({
            message: "Tv trailers fetched successfully",
            success: true,
            trailers: data.results
        })
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({
                message: "Tv not found",
                success: false
            });
        }
        return res.status(500).json({
            message: `Internal server error in getTvTrailers controller: ${error.message}`,
            success: false
        });
    }
}

export const getTvDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        return res.status(200).json({
            message: "Tv details fetched successfully",
            success: true,
            details: data
        })
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({
                message: "Tv not found",
                success: false
            });
        }
        return res.status(500).json({
            message: `Internal server error in getTvDetails controller: ${error.message}`,
            success: false
        });
    }
}

export const getSimilarTvs = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        return res.status(200).json({
            message: "Similar Tvs fetched successfully",
            success: true,
            similarContent: data
        });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({
                message: "Tv not found",
                success: false
            });
        }
        return res.status(500).json({
            message: `Internal server error in getSimilarTvs controller: ${error.message}`,
            success: false
        });
    }
}

export const getTvByCategory = async (req, res) => {
    const { category } = req.params;
    
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        return res.status(200).json({
            message: "Tv category fetched successfully",
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
            message: `Internal server error in getTvByCategory controller: ${error.message}`,
            success: false
        });
    }
}