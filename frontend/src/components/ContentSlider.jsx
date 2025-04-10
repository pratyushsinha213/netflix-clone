import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/useContentStore'
import { axiosInstance } from '../utils/axios';
import { Link } from 'react-router-dom';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ContentSlider = ({ category }) => {

    const [content, setContent] = useState([]);
    const [showArrows, setShowArrows] = useState(false);
    const sliderRef = useRef(null);
    
    const { contentType } = useContentStore();

    const formattedCategoryName = category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
    const formattedContentType = contentType === "movie" ? "MOVIE" : "TV SHOWS";

    useEffect(() => {
        const getContent = async () => {
            const response = await axiosInstance.get(`/${contentType}/${category}`);
            setContent(response.data.content);
        }

        getContent();
    }, [contentType, category]);

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({left: -sliderRef.current.offsetWidth, behavior: 'smooth'});
        }
    }
    
    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({left: sliderRef.current.offsetWidth, behavior: 'smooth'});
        }
    }


    return (
        <div
            className='relative px-5 text-white bg-black md:px-20'
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
        >
            <h2 className='mb-4 text-2xl font-bold'>
                {formattedCategoryName} {formattedContentType}
            </h2>
            <div className="flex space-x-4 overflow-x-scroll scrollbar-hide" ref={sliderRef}>
                {content.map((item) => (
                    <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
                        <div className='overflow-hidden rounded-lg'>
                            <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt="image" className='transition-transform duration-300 ease-in-out group-hover:scale-125' />
                        </div>
                        <p className='mt-2 text-center'>
                            {item.title || item.name}
                        </p>
                    </Link>
                ))}
            </div>

            {showArrows && (
                <>
                    <button
                        className='absolute z-10 flex items-center justify-center text-white -translate-y-1/2 rounded-full cursor-pointer bg-black/50 top-1/2 left-5 md:left-24 size-12 hover:bg-black/75'
                        onClick={scrollLeft}
                        
                    >
                        <ChevronLeft size={24}/>
                    </button>
                    <button
                        className='absolute z-10 flex items-center justify-center text-white -translate-y-1/2 rounded-full cursor-pointer bg-black/50 top-1/2 right-5 md:right-24 size-12 hover:bg-black/75'
                        onClick={scrollRight}
                    >
                        <ChevronRight size={24}/>
                    </button>
                </>
            )}
        </div>
    )
}

export default ContentSlider