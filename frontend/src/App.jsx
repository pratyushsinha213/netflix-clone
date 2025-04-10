import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import Footer from './components/Footer.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader2 } from 'lucide-react'
import WatchPage from './pages/WatchPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import SearchHistoryPage from './pages/SearchHistoryPage.jsx'
import Custom404Page from './pages/Custom404Page.jsx'

const App = () => {

    const { user, isCheckingAuth, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth) {
        return (
            <div className='h-screen'>
                <div className='flex items-center justify-center h-full bg-black'>
                    <Loader2 className='text-red-600 size-24 animate-spin'/>
                </div>
            </div>
        )
    }

    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
                <Route path='/register' element={!user ? <RegisterPage /> : <Navigate to={'/'} />} />
                <Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={'/'} /> }/>
                <Route path='/search' element={user ? <SearchPage /> : <Navigate to={'/'} />} />
                <Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={'/'} />} />
                <Route path='/*' element={<Custom404Page />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;