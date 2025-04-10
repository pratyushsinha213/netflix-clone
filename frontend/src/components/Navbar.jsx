import { LogOut, Menu, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { useContentStore } from '../store/useContentStore';

const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { user, logout } = useAuthStore();
    const { setContentType } = useContentStore();



    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <header className='flex flex-wrap items-center justify-between h-20 max-w-6xl p-4 mx-auto'>
            <div className="z-50 flex items-center gap-10">
                <Link to={'/'}>
                    <img src="/netflix-logo.png" alt="logo" className='w-32 md:w-52' />
                </Link>

                {/* Desktop Navbar */}
                <div className='items-center hidden gap-8 sm:flex'>
                    <Link to={'/'} className='transition-all ease-in hover:text-red-600' onClick={() => setContentType("movie")}>
                        Movies
                    </Link>
                    <Link to={'/'} className='transition-all ease-in hover:text-red-600' onClick={() => setContentType("tv")}>
                        TV Shows
                    </Link>
                    <Link to={'/history'} className='transition-all ease-in hover:text-red-600'>
                        Search History
                    </Link>
                </div>
            </div>

            <div className='z-50 flex items-center gap-5'>
                <Link to={'/search'}>
                    <Search className='cursor-pointer size-6' />
                </Link>
                <img src={user.image} alt="profilepic" className='rounded-md size-10' />
                <LogOut
                    className='transition-all ease-in cursor-pointer size-6 hover:text-red-600'
                    onClick={handleLogout}
                />

                <div className="ease-in sm:hidden tranisition-all">
                    {isMobileMenuOpen ? (
                        <X
                            className='cursor-pointer size-6'
                            onClick={toggleMobileMenu}
                        />
                    ) : (
                        <Menu
                            className='cursor-pointer size-6'
                            onClick={toggleMobileMenu}
                        />
                    )}
                </div>
            </div>

            {/* Mobile Navbar */}
            {isMobileMenuOpen && (
                <div className='z-50 w-full mt-4 bg-black border border-gray-800 rounded sm:hidden'>
                    <Link
                        to={'/'}
                        className='block px-4 py-2 text-white transition-all ease-in hover:text-red-600'
                        onClick={toggleMobileMenu}
                    >
                        Movies
                    </Link>
                    <Link
                        to={'/'}
                        className='block px-4 py-2 text-white transition-all ease-in hover:text-red-600'
                        onClick={toggleMobileMenu}
                    >
                        TV Shows
                    </Link>
                    <Link
                        to={'/history'}
                        className='block px-4 py-2 text-white transition-all ease-in hover:text-red-600'
                        onClick={toggleMobileMenu}
                    >
                        Search History
                    </Link>
                </div>
            )}
        </header>
    )
}

export default Navbar