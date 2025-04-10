import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios';
import Navbar from '../components/Navbar';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Trash } from 'lucide-react';
import toast from 'react-hot-toast';

const SearchHistoryPage = () => {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const getSearchHistory = async () => {
            try {
                const response = await axiosInstance.get(`/search/history`);
                setSearchHistory(response.data.content);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setSearchHistory([]);
            }
        };

        getSearchHistory();

    }, []);

    const handleDelete = async (item) => {
        try {
            const response = await axiosInstance.delete(`/search/history/${item.id}`);
            setSearchHistory(searchHistory.filter((i) => i.id !== item.id));
            toast.success(response.data.message || "Search item deleted successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Failed to delete search item")
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = monthNames[date.getUTCMonth()];
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();

        return `${month} ${day}, ${year}`;
    }

    if (searchHistory?.length === 0) {
        return (
            <div className='min-h-screen text-white bg-black'>
                <Navbar />
                <div className='max-w-6xl px-4 py-8 mx-auto'>
                    <h1 className='mb-8 text-3xl font-bold'>Search History</h1>
                    <div className='flex items-center justify-center h-96'>
                        <p className='text-xl'>No search history found</p>
                    </div>
                </div>
            </div>
        );
    }

    

    return (
        <div className='min-h-screen text-white bg-black'>
            <Navbar />
            <div className='max-w-6xl px-4 py-8 mx-auto'>
                <h1 className='mb-8 text-3xl font-bold'>Search History</h1>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                    {searchHistory?.map((item) => (
                        <div key={item.id} className='flex items-start p-4 bg-gray-800 rounded'>
                            <img src={SMALL_IMG_BASE_URL + item.image} alt="History image" className='object-cover mr-4 rounded-full size-16' />
                            <div className='flex flex-col'>
                                <span className='text-lg text-white'>{item.title}</span>
                                <span className='text-sm text-gray-400'>{formatDate(item.createdAt)}</span>
                            </div>
                            <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${item.searchType === "movie" ? "bg-red-600" : item.searchType === "tv" ? "bg-blue-600" : "bg-green-600"}`}>
                                {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
                            </span>
                            <Trash size={20} className='ml-4 transition-all ease-in-out cursor-pointer hover:fill-red-600 hover:text-red-600'
                                onClick={() => handleDelete(item)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchHistoryPage