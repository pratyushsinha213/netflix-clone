import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

const RegisterPage = () => {

    const { searchParams } = new URL(document.location);
    const emailVal = searchParams.get('email');

    const [email, setEmail] = useState(emailVal || "");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { register, isLoading } = useAuthStore();

    const handleRegister = (e) => {
        e.preventDefault();
        register({ email, username, password });
    }

    return (
        <div className='w-full h-screen hero-bg'>
            <header className='flex items-center justify-between max-w-6xl p-4 mx-auto'>
                <Link to={"/"}>
                    <img src="/netflix-logo.png" alt="logo" className='w-52' />
                </Link>
            </header>

            <div className='flex items-center justify-center mx-3 mt-20'>
                <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-black/60">
                    <h1 className='mb-4 text-2xl font-bold text-center text-white'>
                        Register
                    </h1>
                    <form onSubmit={handleRegister} className='space-y-4'>
                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-300'>Email</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id='email'
                                className='w-full px-3 py-2 mt-1 text-white bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring'
                                placeholder='john@doe.com'
                                value={email}
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className='block text-sm font-medium text-gray-300'>Username</label>
                            <input
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id='username'
                                className='w-full px-3 py-2 mt-1 text-white bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring'
                                placeholder='johndoe69'
                                value={username}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-300'>Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id='password'
                                className='w-full px-3 py-2 mt-1 text-white bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring'
                                placeholder='••••••••'
                                value={password}
                            />
                        </div>

                        <button
                            className={`w-full px-3 py-2 mt-1 font-semibold text-white transition-all ease-in rounded-md ${isLoading ? "" : "cursor-pointer"} ${isLoading ? "bg-gray-500" : "bg-red-600 "} ${isLoading ? "hover:bg-gray-600" : "hover:bg-red-700"}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className='flex items-center justify-center'>
                                    <Loader2 className='animate-spin size-6' />
                                </div>
                            ) :
                                "Register"
                            }
                        </button>
                    </form>

                    <div className="text-sm text-center text-gray-400">
                        Already a member? {' '}
                        <Link to={'/login'} className='text-red-600 underline transition-all ease-in hover:text-red-700'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage