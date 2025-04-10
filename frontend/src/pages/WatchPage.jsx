import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContentStore } from '../store/useContentStore';
import { axiosInstance } from '../utils/axios';
import Navbar from '../components/Navbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import WatchPageSkeleton from '../components/Skeletons/WatchPageSkeleton'

const WatchPage = () => {

    const { id } = useParams();
    const sliderRef = useRef(null);
    const [trailers, setTrailers] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState({});
    const [similarContent, setSimilarContent] = useState([]);

    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const response = await axiosInstance.get(`/${contentType}/${id}/trailers`);
                setTrailers(response.data.trailers);
            } catch (error) {
                if (error.message.includes("404")) {
                    setTrailers([]);
                }
            }
        }

        getTrailers();

    }, [contentType, id]);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const response = await axiosInstance.get(`/${contentType}/${id}/similar`);
                setSimilarContent(response.data.similarContent.results);
            } catch (error) {
                if (error.message.includes("404")) {
                    setSimilarContent([]);
                }
            }
        }
        getSimilarContent();
    }, [contentType, id]);

    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const response = await axiosInstance.get(`/${contentType}/${id}/details`);
                setContent(response.data.details);
            } catch (error) {
                if (error.message.includes("404")) {
                    setContent([]);
                }
            } finally {
                setIsLoading(false);
            }
        }
        getContentDetails();
    }, [contentType, id]);

    const handlePrevious = () => {
        if (currentTrailerIdx > 0) {
            setCurrentTrailerIdx(currentTrailerIdx - 1);
        }
    }

    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1) {
            setCurrentTrailerIdx(currentTrailerIdx + 1);
        }
    }

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: 'smooth' });
        }
    }

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: 'smooth' });
        }
    }

    const formatReleaseDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    if (isLoading) {
        return (
            <div className='min-h-screen p-10 bg-black'>
                <Navbar />
                <WatchPageSkeleton />
            </div>
        )
    }


    return (
        <div className='min-h-screen text-white bg-black'>
            <div className="container h-full px-4 py-8 mx-auto">
                <Navbar />
                {trailers.length > 0 && (
                    <div className='flex items-center justify-between mt-6 mb-10'>
                        <button
                            className={`px-4 py-2 text-white rounded-lg bg-gray-500/70 hover:bg-grapy-500 ${currentTrailerIdx === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                            disabled={currentTrailerIdx === 0}
                            onClick={handlePrevious}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            className={`px-4 py-2 text-white rounded-lg bg-gray-500/70 hover:bg-grapy-500 ${currentTrailerIdx === trailers.length - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                            disabled={currentTrailerIdx === trailers.length - 1}
                            onClick={handleNext}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                <div className="p-2 mb-8 md:px-32 aspect-video sm:p-10">
                    {trailers.length > 0 && (
                        <ReactPlayer
                            controls={true}
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                            width={"100%"}
                            height={"70vh"}
                            className="mx-auto overflow-hidden rounded-lg"
                        />
                    )}

                    {trailers.length === 0 && (
                        <h2 className='mt-5 text-xl text-center'>
                            No trailers available for {" "}
                            <span className='font-bold text-red-600'>{content?.title || content?.name}</span> 😪
                        </h2>
                    )}
                </div>

                {/* Movie Details */}
                <div className="flex flex-col items-center justify-between max-w-6xl gap-20 mx-auto md:flex-row">
                    <div className="mb-4 space-y-6 md:mb-0">
                        <h2 className='text-5xl font-bold text-balance'>
                            {content?.title || content?.name}
                        </h2>
                        <p className='mt-2 text-lg'>
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} | {" "}
                            {content?.adult ? (
                                <span className='text-red-600'>18+</span>
                            ) : (
                                <span className='text-green-600'>PG-13</span>
                            )} {" "}
                        </p>
                        <p className='mt-4 text-lg text-justify'>
                            {content?.overview}
                        </p>
                    </div>
                    <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path} alt="poster image" className='max-h-[500px] rounded-md' />
                </div>
                {similarContent.length > 0 && (
                    <div className='relative max-w-5xl mx-auto mt-12'>
                        <h3 className='mb-4 text-3xl font-bold'>
                            Similar {contentType === "movie" ? "Movies" : "TV Shows"}
                        </h3>
                        <div className="flex gap-4 pb-4 overflow-x-scroll scrollbar-hide group" ref={sliderRef}>
                            {similarContent.map((content) => (
                                <Link key={content.id} to={`/watch/${content.id}`} className='flex-none w-52'>
                                    <img src={SMALL_IMG_BASE_URL + content.poster_path} alt="poster image" className='w-full h-auto rounded-md' />
                                    <h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
                                </Link>
                            ))}
                            <button
                                className='absolute text-white transition-all duration-300 -translate-y-1/2 bg-red-600 rounded-full opacity-0 cursor-pointer top-1/2 left-2 size-8 group-hover:opacity-100'
                                onClick={scrollLeft}
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                className='absolute transition-all duration-300 -translate-y-1/2 bg-red-600 rounded-full opacity-0 cursor-pointer t ext-white top-1/2 right-2 size-8 group-hover:opacity-100'
                                onClick={scrollRight}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div> 
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchPage