import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/Auth.jsx';

function AuthModel({ onClose }) {
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        if (userData) {
            onClose()
        }
    }, [userData, onClose])

    return (
        <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4'>
            <div className='relative w-full max-w-md'>
                {/* ✅ X BUTTON - Modal band karne ke liye */}
                <button 
                    onClick={onClose} 
                    className='absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-500 hover:text-gray-700 border border-gray-200'
                >
                    <FaTimes size={10} className="sm:text-lg" />
                </button>
                
                {/* Auth component - isModel=true matlab modal mode me */}
                <Auth isModel={true} onClose={onClose} />
            </div>
        </div>
    )
}

export default AuthModel
