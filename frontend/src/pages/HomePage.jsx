import React from 'react'
import HomeScreen from './home/HomeScreen.jsx'
import AuthScreen from './home/AuthScreen.jsx'
import { useAuthStore } from '../store/useAuthStore.js';

const HomePage = () => {
    const { user } = useAuthStore();

    return (
        <>
            {user ? (<HomeScreen />) : (<AuthScreen />)}
        </>
    )
}

export default HomePage