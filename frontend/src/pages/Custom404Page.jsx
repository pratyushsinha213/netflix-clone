import React from 'react'
import { Link } from 'react-router-dom';

const Custom404Page = () => {
    return (
        <div
            className='flex flex-col items-center justify-center min-h-screen text-white bg-center bg-cover'
            style={{ backgroundImage: `url('/404.png')` }}
        >
            <header className='absolute top-0 left-0 w-full p-4 bg-black '>
                <Link to={"/"}>
                    <img src='/netflix-logo.png' alt='Netflix' className='w-52' />
                </Link>
            </header>
            <main className='z-10 text-center error-page--content'>
                <h1 className='mb-4 font-semibold text-7xl'>Lost your way?</h1>
                <p className='mb-6 text-xl'>
                    Sorry, we can't find that page. You'll find lots to explore on the home page.
                </p>
                <Link to={"/"} className='px-4 py-2 text-black bg-white rounded'>
                    Netflix Home
                </Link>
            </main>
        </div>
    );
}

export default Custom404Page