import React from 'react'
import { BsRobot, BsStars, BsShieldCheck, BsLightning } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { FaRocket, FaUserAstronaut } from "react-icons/fa";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({ isModel = false, onClose }) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
            dispatch(setUserData(result.data))
            
            // Close modal after successful login
            if (isModel && onClose) {
                onClose()
            }
        } catch (error) {
            console.log(error)
            dispatch(setUserData(null))
        }
    }

    return (
        <div className={`
            w-full 
            ${isModel ? "py-4" : "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/30 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20"}
        `}>
            <motion.div 
                initial={{ opacity: 0, y: -50, scale: 0.95 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className={`
                    w-full 
                    ${isModel ? "max-w-md p-6 sm:p-8 rounded-2xl" : "max-w-lg p-8 sm:p-12 rounded-3xl sm:rounded-[40px]"}
                    bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border border-white/50
                    relative overflow-hidden
                `}
            >
                {/* ❌ X BUTTON HATAYA - Ab sirf AuthModel me hai */}

                {/* Decorative Background */}
                <div className='absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-blue-400/10 rounded-full blur-3xl' />
                <div className='absolute bottom-[-100px] left-[-100px] w-[250px] h-[250px] bg-purple-400/10 rounded-full blur-3xl' />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-400/5 rounded-full blur-3xl' />

                {/* Floating Particles */}
                <div className='absolute top-5 right-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping' />
                <div className='absolute bottom-8 left-6 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-700' />
                <div className='absolute top-1/3 left-10 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-1000' />

                <div className='relative z-10'>
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className='flex items-center justify-center gap-3 mb-5'
                    >
                        <div className='relative'>
                            <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-md opacity-60 animate-pulse' />
                            <div className='relative bg-gradient-to-br from-gray-900 to-black p-2.5 rounded-xl shadow-lg'>
                                <BsRobot className='text-white text-xl' />
                            </div>
                        </div>
                        <h2 className='font-extrabold text-xl'>
                            <span className='text-gray-800'>NextHire</span>
                            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>.AI</span>
                        </h2>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className='text-center mb-4'
                    >
                        <h1 className='text-2xl sm:text-3xl font-bold leading-snug'>
                            <span className='text-gray-800'>Continue with</span>
                            <br />
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className='inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 mt-1'
                            >
                                <IoSparkles size={18} className="animate-pulse" />
                                AI Smart Interview
                            </motion.span>
                        </h1>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className='text-gray-500 text-center text-sm sm:text-base leading-relaxed mb-6'
                    >
                        Sign in to start AI-powered mock interviews,
                        track your progress, and unlock detailed performance insights.
                    </motion.p>

                    {/* Features Strip */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className='flex flex-wrap justify-center gap-2 mb-6'
                    >
                        {[
                            { icon: <BsLightning className="text-yellow-500" />, text: "AI-Powered" },
                            { icon: <BsStars className="text-purple-500" />, text: "Smart Feedback" },
                            { icon: <BsShieldCheck className="text-emerald-500" />, text: "Secure" },
                        ].map((item, i) => (
                            <span 
                                key={i}
                                className='flex items-center gap-1.5 bg-gray-50/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200/60 text-xs font-medium text-gray-600 shadow-sm'
                            >
                                {item.icon}
                                {item.text}
                            </span>
                        ))}
                    </motion.div>

                    {/* Divider */}
                    <div className='relative mb-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-200/60'></div>
                        </div>
                        <div className='relative flex justify-center'>
                            <span className='bg-white px-4 text-[10px] text-gray-400 font-medium tracking-widest'>
                                GET STARTED
                            </span>
                        </div>
                    </div>

                    {/* Google Button */}
                    <motion.button 
                        onClick={handleGoogleAuth}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className='w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300 font-semibold text-sm sm:text-base relative overflow-hidden group'
                    >
                        <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />
                        <div className='bg-white/10 p-1.5 rounded-full'>
                            <FcGoogle size={22} />
                        </div>
                        <span>Continue with Google</span>
                        <FaRocket className="text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </motion.button>

                    {/* Footer */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className='text-center text-[10px] text-gray-400 mt-4 flex items-center justify-center gap-1'
                    >
                        <FaUserAstronaut className="text-[10px]" />
                        By continuing, you agree to our Terms & Privacy Policy
                    </motion.p>
                </div>
            </motion.div>
        </div>
    )
}

export default Auth