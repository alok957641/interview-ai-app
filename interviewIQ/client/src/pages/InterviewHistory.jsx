import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaCalendarAlt, FaBriefcase, FaClock, FaStar, FaChartLine } from 'react-icons/fa'
import { BsRobot, BsStars } from "react-icons/bs";
import { motion } from "motion/react"

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getMyInterviews()
    }, [])

    // Get score color
    const getScoreColor = (score) => {
        if (score >= 8) return "text-emerald-600 bg-emerald-50"
        if (score >= 5) return "text-amber-600 bg-amber-50"
        return "text-red-500 bg-red-50"
    }

    // Get score emoji
    const getScoreEmoji = (score) => {
        if (score >= 8) return "🏆"
        if (score >= 5) return "💪"
        return "📈"
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/30 py-8 sm:py-12'>
            <div className='w-[92%] sm:w-[88%] lg:w-[75%] max-w-5xl mx-auto'>

                {/* Header */}
                <div className='mb-8 sm:mb-10 flex items-start gap-3 sm:gap-4 flex-wrap'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/")}
                        className='mt-1 p-3 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'
                    >
                        <FaArrowLeft className='text-gray-600' />
                    </motion.button>

                    <div>
                        <div className='flex items-center gap-2'>
                            <BsStars className='text-emerald-500 text-2xl' />
                            <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-800'>
                                Interview History
                            </h1>
                        </div>
                        <p className='text-gray-400 text-sm mt-1 flex items-center gap-2'>
                            <span className='w-1.5 h-1.5 bg-emerald-400 rounded-full' />
                            Track your past interviews and performance reports
                            <span className='w-1.5 h-1.5 bg-emerald-400 rounded-full' />
                            {interviews.length} interviews completed
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className='bg-white/80 backdrop-blur-sm rounded-3xl p-16 text-center shadow-xl border border-white/50'>
                        <div className='w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4' />
                        <p className='text-gray-500 font-medium'>Loading your interviews...</p>
                    </div>
                ) : interviews.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='bg-white/80 backdrop-blur-sm rounded-3xl p-12 sm:p-16 text-center shadow-xl border border-white/50'
                    >
                        <div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <BsRobot className='text-4xl text-gray-400' />
                        </div>
                        <h3 className='text-xl font-bold text-gray-700 mb-2'>No Interviews Found</h3>
                        <p className='text-gray-400 text-sm'>
                            You haven't taken any interviews yet.
                            <br />
                            Start your first AI-powered interview now!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/interview")}
                            className='mt-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-xl transition-all duration-300'
                        >
                            Start Interview
                        </motion.button>
                    </motion.div>
                ) : (
                    <div className='grid gap-5 sm:gap-6'>
                        {interviews.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ scale: 1.01, y: -3 }}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200/50 cursor-pointer group'
                            >
                                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                                    {/* Left - Details */}
                                    <div className='flex-1'>
                                        <div className='flex items-center gap-3 flex-wrap'>
                                            <div className='bg-gradient-to-br from-emerald-50 to-teal-50 p-2 rounded-xl'>
                                                <FaBriefcase className='text-emerald-600 text-sm' />
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                                {item.role}
                                            </h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === "completed"
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div className='flex flex-wrap items-center gap-3 sm:gap-5 mt-2'>
                                            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5">
                                                <FaClock className="text-gray-400 text-[10px]" />
                                                {item.experience}
                                            </p>
                                            <span className='w-1 h-1 bg-gray-300 rounded-full' />
                                            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1.5">
                                                <BsRobot className="text-gray-400 text-[10px]" />
                                                {item.mode}
                                            </p>
                                            <span className='w-1 h-1 bg-gray-300 rounded-full' />
                                            <p className="text-gray-400 text-xs flex items-center gap-1.5">
                                                <FaCalendarAlt className="text-gray-400 text-[10px]" />
                                                {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right - Score & Status */}
                                    <div className='flex items-center gap-4 sm:gap-6'>
                                        {/* Score */}
                                        <div className="text-right">
                                            <div className={`px-4 py-1.5 rounded-xl ${getScoreColor(item.finalScore || 0)} flex items-center gap-1.5`}>
                                                <span className="text-sm">{getScoreEmoji(item.finalScore || 0)}</span>
                                                <span className="text-lg font-extrabold">
                                                    {item.finalScore || 0}
                                                </span>
                                                <span className="text-xs opacity-60">/10</span>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-1 font-medium tracking-wider">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* Arrow */}
                                        <div className='text-gray-300 group-hover:text-emerald-500 transition-colors duration-300'>
                                            <FaArrowLeft className="rotate-180 text-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className='mt-4 pt-4 border-t border-gray-100/60'>
                                    <div className='flex items-center gap-3'>
                                        <FaChartLine className='text-gray-300 text-xs' />
                                        <div className='flex-1 h-1.5 bg-gray-200/60 rounded-full overflow-hidden'>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(item.finalScore || 0) * 10}%` }}
                                                transition={{ duration: 1, delay: index * 0.05 }}
                                                className={`h-full rounded-full ${(item.finalScore || 0) >= 8 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                                                        (item.finalScore || 0) >= 5 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                                                        'bg-gradient-to-r from-red-500 to-rose-500'
                                                    }`}
                                            />
                                        </div>
                                        <span className='text-[10px] text-gray-400 font-medium whitespace-nowrap'>
                                            {Math.round((item.finalScore || 0) * 10)}%
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InterviewHistory