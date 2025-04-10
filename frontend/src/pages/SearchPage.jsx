import React, { useState } from 'react'
import { useContentStore } from '../store/useContentStore';
import Navbar from '../components/Navbar';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../utils/axios';
import { Link } from 'react-router-dom';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';

const SearchPage = () => {

    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const { setContentType } = useContentStore();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        tab === "movie" ? setContentType('movie') : setContentType('tv');
        setResults([]);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/search/${activeTab}/${searchTerm}`);
            setResults(response.data.content);
        } catch (error) {
            if (error.message.includes("404")) {
                toast.error("Nothing found, make sure you are searching under the right category.");
            } else {
                toast.error(error.response.data.message || "Search failed.");
            }
        }
    }

    return (
        <div className='min-h-screen text-white bg-black'>
            <Navbar />
            <div className="container px-4 py-8 mx-auto">
                <div className="flex justify-center gap-3 mb-4">
                    <button
                        className={`py-2 cursor-pointer transition-all ease-in-out px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("movie")}
                    >
                        Movies
                    </button>
                    <button
                        className={`py-2 cursor-pointer transition-all ease-in-out px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("tv")}
                    >
                        TV Shows
                    </button>
                    <button
                        className={`py-2 cursor-pointer transition-all ease-in-out px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
                        onClick={() => handleTabClick("person")}
                    >
                        Person
                    </button>
                </div>
                <form className='flex items-stretch max-w-2xl gap-3 mx-auto mb-8' onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder={`Search for a ${activeTab}`}
                        className='flex-1 px-2 py-3 border border-gray-700 rounded focus:outline-none bg-black/80 focus:ring'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className='flex items-center justify-center px-4 text-white bg-red-600 rounded cursor-pointer hover:bg-red-700'
                    >
                        <Search size={20} />
                    </button>
                </form>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {results.map((result) => {
                        if (!result.poster_path && !result.profile_path) return null;

                        return (
                            <div key={result.id} className='p-4 bg-gray-800 rounded'>
                                {activeTab === "person" ? (
                                    <div
                                    // <Link
                                        // to={`/actor/${result.name}`}
                                        className='flex flex-col items-center justify-center gap-2'
                                    >
                                        <img src={ORIGINAL_IMG_BASE_URL + result.profile_path} alt={result.name} />
                                        <h2 className='mt-2 text-xl font-bold text-center'>{result.name}</h2>
                                    {/* </Link> */}
                                    </div>
                                ) : (
                                    <Link
                                        to={`/watch/${result.id}`}
                                        onClick={setContentType(activeTab)}
                                    >
                                        <img src={ORIGINAL_IMG_BASE_URL + result.poster_path} alt={result.title || result.name} className='w-full h-auto rounded' />
                                        <h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
                                    </Link>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchPage