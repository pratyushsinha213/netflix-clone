import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const AuthScreen = () => {

    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/register?email=${email}`);
    }

    return (
        <div className='relative hero-bg'>
            {/* Navbar */}
            <header className='flex items-center justify-between max-w-6xl p-4 pb-10 mx-auto'>
                <img src={"/netflix-logo.png"} alt="logo" className='w-32 md:w-52' />
                <Link to={'/login'} className='px-2 py-1 text-white transition-all ease-in bg-red-600 rounded text-md hover:bg-red-700'>Sign In</Link>
            </header>

            {/* Hero section */}
            <div className="flex flex-col items-center justify-center max-w-6xl py-40 mx-auto text-center text-white">
                <h1 className='mb-4 text-4xl font-bold md:text-6xl'>Unlimited movies, TV shows and more.</h1>
                <p className='mb-4 text-xl'>Watch anywhere. Cancel anytime.</p>
                <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>
                <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 md:flex-row'>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        className='flex-1 p-2 border border-gray-700 rounded focus:outline-none bg-black/80 focus:ring'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className='flex items-center justify-center px-2 py-1 text-lg text-white transition-all ease-in bg-red-600 rounded cursor-pointer lg:px-6 lg:text-2xl hover:bg-red-700 md:py-2'>
                        Get Started
                        <ChevronRight className='pr-0 size-8 md:size-10' />
                    </button>
                </form>
            </div>

            {/* Seperator */}
            <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

            {/* 1st Section */}
            <div className='py-10 text-white bg-black'>
                <div className="flex flex-col items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2">
                    {/* Left/Top side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className='mb-4 text-4xl font-extrabold md:text-5xl'>Enjoy on your TV.</h2>
                        <p className='text-lg md:text-xl'>Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                    </div>
                    {/* Right/Bottom side */}
                    <div className="relative flex-1">
                        <img src={'/tv.png'} alt="tv-image" className='relative z-20 mt-4' />
                        <video className='absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-1/2'
                            playsInline
                            autoPlay={true}
                            loop
                            muted
                        >
                            <source src={'/hero-vid.mp4'} type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>

            {/* Seperator */}
            <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

            {/* 2nd Section */}
            <div className='py-10 text-white bg-black'>
                <div className="flex flex-col-reverse items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2">

                    {/* Left/Top side */}
                    <div className="relative flex-1">
                        <div className='relative'>
                            <img src={'/stranger-things-lg.png'} alt="stranger-things-image" className='' />
                            <div className='absolute flex items-center w-3/4 h-24 gap-2 p-2 px-2 -translate-x-1/2 bg-black border rounded-md bottom-5 left-1/2 lg:w-1/2 border-slate-500'>
                                <img src={"/stranger-things-sm.png"} alt="image" className='h-full' />
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-0">
                                        <span className='font-bold text-md lg:text-lg'>Stranger Things</span>
                                        <span className='text-sm text-blue-600'>Downloading...</span>
                                    </div>
                                    <img src={'/download-icon.gif'} alt="gif" className='h-12' />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right/Bottom side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className='mb-4 text-4xl font-extrabold md:text-5xl text-balance'>Download your shows to watch offline.</h2>
                        <p className='text-lg md:text-xl'>Save your favorites easily and always have something to watch.</p>
                    </div>
                </div>
            </div>

            {/* Seperator */}
            <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

            {/* 3rd Section */}
            <div className='py-10 text-white bg-black'>
                <div className="flex flex-col items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2">
                    {/* Left/Top side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className='mb-4 text-4xl font-extrabold md:text-5xl'>Watch everywhere.</h2>
                        <p className='text-lg md:text-xl'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                    </div>
                    {/* Right/Bottom side */}
                    <div className="relative flex-1 overflow-hidden">
                        <img src={'/device-pile.png'} alt="device-pile-image" className='relative z-20 mt-4' />
                        <video className='absolute z-10 -translate-x-1/2 top-2 left-1/2 h-4/6 max-w-[63%] '
                            playsInline
                            autoPlay={true}
                            loop
                            muted
                        >
                            <source src={'/video-devices.mp4'} type='video/mp4' />
                        </video>
                    </div>
                </div>
            </div>

            {/* Seperator */}
            <div className='w-full h-2 bg-[#232323]' aria-hidden='true' />

            {/* 4th Section */}
            <div className='py-10 text-white bg-black'>
                <div className="flex flex-col-reverse items-center justify-center max-w-6xl px-4 mx-auto md:flex-row md:px-2">
                    {/* Left/Top side */}
                    <div className="relative flex-1">
                        <div className='relative'>
                            <img src={'/kids.png'} alt="stranger-things-image" className='' />
                            
                        </div>
                    </div>
                    {/* Right/Bottom side */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className='mb-4 text-4xl font-extrabold md:text-5xl text-balance'>Create profiles for kids.</h2>
                        <p className='text-lg md:text-xl'>Send children on adventures with their favorite characters in a space made just for them—free with your membership.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen