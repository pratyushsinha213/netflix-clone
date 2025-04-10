import React, { useState } from 'react'
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import { useContentStore } from '../../store/useContentStore';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from '../../utils/constants';
import ContentSlider from '../../components/ContentSlider';

const HomeScreen = () => {

    const { trendingContent } = useGetTrendingContent();
    const { contentType } = useContentStore();  

    const [imageLoading, setImageLoading] = useState(true);


    if (!trendingContent) {
        return (
            <div className='relative h-screen text-white'>
                <Navbar />
                <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/70 -z-10 shimmer' />
            </div>
        )
    }

    return (
        <>
            <div className='relative h-screen text-white'>

                <Navbar />

                {imageLoading && (
                    <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/70 -z-10 shimmer' />
                )}

                <img
                    src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
                    alt="image"
                    className='absolute top-0 left-0 object-cover w-full h-full -z-50'
                    onLoad={() => setImageLoading(false)}
                />
                <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden={"true"} />

                <div className="absolute top-0 left-0 flex flex-col justify-center w-full h-full px-8 md:px-16 lg:px-32">
                    <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-transparent -z-10' />
                    <div className='max-w-2xl'>
                        <h1 className='mt-4 text-6xl font-extrabold text-balance'>
                            {trendingContent?.title || trendingContent?.name}
                        </h1>
                        <p className='mt-2 text-lg'>
                            {trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date?.split("-")[0]}
                            {" | "}
                            {trendingContent?.adult ? "18+" : "PG-13"}
                        </p>
                        <p className='mt-4 text-lg'>
                            {trendingContent?.overview.length > 200 ?
                                trendingContent?.overview.slice(0, 200) + "..."
                                :
                                trendingContent?.overview
                            }
                        </p>
                    </div>
                    <div className='flex mt-8'>
                        <Link to={`/watch/${trendingContent?.id}`}
                            className='flex items-center px-4 py-2 mr-4 font-bold text-black transition-all ease-in bg-white rounded hover:bg-white/80'
                        >
                            <Play className='mr-2 size-6 fill-black' />
                            Play
                        </Link>
                        <Link to={`/details/${trendingContent?.id}`}
                            className='flex items-center px-4 py-2 font-bold text-white transition-all ease-in rounded bg-gray-500/70 hover:bg-gray-500'
                        >
                            <Info className='mr-2 size-6' />
                            More Info
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10 py-10 bg-black">
                {contentType === "movie" ? (
                    MOVIE_CATEGORIES.map((category) => <ContentSlider key={category} category={category} />)
                ) : (
                    TV_CATEGORIES.map((category) => <ContentSlider key={category} category={category} />)
                )}
            </div>
        </>
    )
}

export default HomeScreen