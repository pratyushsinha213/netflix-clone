import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/useContentStore'
import { axiosInstance } from '../utils/axios';

const useGetTrendingContent = () => {

    const [trendingContent, setTrendingContent] = useState(null)
    const { contentType } = useContentStore();

    useEffect(() => {
        const getTrendingContent = async () => {
            const response = await axiosInstance.get(`/${contentType}/trending`);
            setTrendingContent(response.data.content);
        }

        getTrendingContent();
    }, [contentType]);

    return { trendingContent };
}

export default useGetTrendingContent