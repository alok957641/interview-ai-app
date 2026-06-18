import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin, BsStars } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const [showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-[#f3f3f3] flex justify-center px-3 sm:px-4 pt-4 sm:pt-6'>
            <motion.nav 
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4, ease: "easeOut"}}
                className='w-full max-w-6xl bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-lg shadow-gray-200/50 border border-white/50 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex justify-between items-center relative'
            >
                {/* Left - Logo */}
                <div 
                    onClick={() => navigate("/")}
                    className='flex items-center gap-2 sm:gap-3 cursor-pointer group'
                >
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300' />
                        <div className='relative bg-gradient-to-br from-gray-900 to-black p-2 rounded-xl shadow-lg'>
                            <BsRobot className='text-white text-lg sm:text-xl' />
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-base sm:text-lg md:text-xl tracking-tight'>
                            <span className='text-gray-800'>NextHire</span>
                            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>.AI</span>
                        </h1>
                        <p className='hidden sm:block text-[10px] text-gray-400 -mt-0.5 tracking-wider'>
                            ✦ AI Interview Prep ✦
                        </p>
                    </div>
                </div>

                {/* Right - Actions */}
                <div className='flex items-center gap-2 sm:gap-4 md:gap-6 relative'>
                    
                    {/* Credits Button */}
                    <div className='relative'>
                        <button 
                            onClick={() => {
                                if(!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowCreditPopup(!showCreditPopup);
                                setShowUserPopup(false)
                            }} 
                            className='flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/60 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 group'
                        >
                            <BsCoin className='text-amber-500 text-base sm:text-xl group-hover:scale-110 transition-transform' />
                            <span className='font-bold text-amber-700 text-sm sm:text-base'>
                                {userData?.credits || 0}
                            </span>
                            <span className='hidden xs:inline text-amber-400 text-xs'>credits</span>
                        </button>

                        {/* Credits Popup */}
                        {showCreditPopup && (
                            <motion.div 
                                initial={{opacity: 0, scale: 0.95, y: -10}}
                                animate={{opacity: 1, scale: 1, y: 0}}
                                className='absolute right-0 sm:right-[-10px] mt-3 w-64 sm:w-72 bg-white shadow-2xl shadow-gray-200/50 border border-gray-100 rounded-2xl p-5 z-50'
                            >
                                <div className='flex items-center gap-2 mb-3'>
                                    <BsStars className='text-yellow-500' />
                                    <p className='text-sm font-medium text-gray-700'>Credit Balance</p>
                                </div>
                                <div className='bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-3 mb-4'>
                                    <p className='text-2xl font-bold text-amber-700 text-center'>
                                        {userData?.credits || 0}
                                    </p>
                                    <p className='text-xs text-amber-500 text-center'>Available Credits</p>
                                </div>
                                <p className='text-xs text-gray-500 mb-4 text-center'>Need more credits to continue interviews?</p>
                                <button 
                                    onClick={() => navigate("/pricing")} 
                                    className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5'
                                >
                                    Buy More Credits →
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* User Profile */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if(!userData) {
                                    setShowAuth(true)
                                    return;
                                }
                                setShowUserPopup(!showUserPopup);
                                setShowCreditPopup(false)
                            }} 
                            className='w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:shadow-gray-400/30 transition-all duration-300 hover:scale-105'
                        >
                            {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16} className="text-gray-400" />}
                        </button>

                        {/* User Popup */}
                        {showUserPopup && (
                            <motion.div 
                                initial={{opacity: 0, scale: 0.95, y: -10}}
                                animate={{opacity: 1, scale: 1, y: 0}}
                                className='absolute right-0 mt-3 w-52 sm:w-56 bg-white shadow-2xl shadow-gray-200/50 border border-gray-100 rounded-2xl p-4 z-500'
                            >
                                <div className='flex items-center gap-3 pb-3 border-b border-gray-100'>
                                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm'>
                                        {userData?.name.slice(0,1).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className='text-sm font-semibold text-gray-800'>{userData?.name}</p>
                                        <p className='text-xs text-gray-400'>{userData?.email}</p>
                                    </div>
                                </div>
                                
                                <div className='py-2 space-y-1'>
                                    <button 
                                        onClick={() => {
                                            navigate("/history")
                                            setShowUserPopup(false)
                                        }} 
                                        className='w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors'
                                    >
                                        📊 Interview History
                                    </button>
                                    <button 
                                        onClick={() => {
                                            navigate("/pricing")
                                            setShowUserPopup(false)
                                        }} 
                                        className='w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors'
                                    >
                                        💳 Buy Credits
                                    </button>
                                </div>
                                
                                <button 
                                    onClick={handleLogout} 
                                    className='w-full text-left text-sm py-2.5 px-3 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors flex items-center gap-2 mt-1 border border-red-100'
                                >
                                    <HiOutlineLogout size={16} />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </motion.nav>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar
