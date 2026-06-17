import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
    FaCheckCircle,
    FaSpinner,
    FaRocket,
    FaArrowRight,
    FaCrown
} from "react-icons/fa";
import { BsLightning, BsStars } from "react-icons/bs";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })
            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
            setAnalyzing(false);
        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(ServerUrl + "/api/interview/generate-questions", { role, experience, mode, resumeText, projects, skills }, { withCredentials: true })
            console.log(result.data)
            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }
            setLoading(false)
            onStart(result.data)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const features = [
        { icon: <FaUserTie className="text-blue-600 text-xl" />, text: "Choose Role & Experience" },
        { icon: <FaMicrophoneAlt className="text-purple-600 text-xl" />, text: "Smart Voice Interview" },
        { icon: <FaChartLine className="text-green-600 text-xl" />, text: "Performance Analytics" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-3 sm:px-4 py-8'
        >
            <div className='w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-gray-300/50 border border-white/50 overflow-hidden'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>

                    {/* LEFT - Features Section */}
                    <motion.div
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className='relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 sm:p-12 flex flex-col justify-center overflow-hidden'
                    >
                        <div className='absolute top-[-150px] right-[-150px] w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-3xl' />
                        <div className='absolute bottom-[-150px] left-[-150px] w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl' />
                        
                        <motion.div
                            initial={{ scale: 0, rotate: -5 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 rounded-full mb-6 w-fit shadow-lg shadow-blue-500/20'
                        >
                            <BsLightning className='text-yellow-300 text-sm animate-pulse' />
                            <span className='text-white text-xs font-bold tracking-widest uppercase'>AI-Powered Interview</span>
                        </motion.div>

                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 leading-tight">
                            Start Your <br />
                            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                AI Interview
                            </span>
                        </h2>

                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Practice real interview scenarios powered by advanced AI.
                            Improve communication, technical skills, and confidence.
                        </p>

                        <div className='space-y-4'>
                            {features.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.15 }}
                                    whileHover={{ scale: 1.03, x: 5 }}
                                    className='flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10'
                                >
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${index === 0 ? 'from-blue-50 to-blue-100' : index === 1 ? 'from-purple-50 to-purple-100' : 'from-green-50 to-green-100'}`}>
                                        {item.icon}
                                    </div>
                                    <span className='text-gray-800 font-semibold'>{item.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className='mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 shadow-sm'
                        >
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-3'>
                                    <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 rounded-xl'>
                                        <FaCrown className='text-white text-lg' />
                                    </div>
                                    <div>
                                        <p className='text-gray-500 text-xs font-medium'>Available Credits</p>
                                        <p className='text-gray-800 text-2xl font-bold'>{userData?.credits || 0}</p>
                                    </div>
                                </div>
                                <div className='bg-gray-100 px-3 py-1.5 rounded-full'>
                                    <span className='text-gray-500 text-xs'>50 = 1 Interview</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT - Form Section */}
                    <motion.div
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        className="p-6 sm:p-10 lg:p-12 bg-white"
                    >
                        <div className='flex items-center gap-3 mb-8'>
                            <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20'>
                                <BsStars className='text-white text-2xl' />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-800'>Interview Setup</h2>
                                <p className='text-gray-400 text-sm'>Fill in the details to begin</p>
                            </div>
                        </div>

                        <div className='space-y-5'>
                            {/* Role Input */}
                            <div className='relative group'>
                                <FaUserTie className='absolute top-3.5 left-4 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10' />
                                <input
                                    type='text'
                                    placeholder='Enter role (e.g. Full Stack Developer)'
                                    className='w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-white'
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                />
                            </div>

                            {/* Experience Input */}
                            <div className='relative group'>
                                <FaBriefcase className='absolute top-3.5 left-4 text-gray-400 group-focus-within:text-purple-500 transition-colors z-10' />
                                <input
                                    type='text'
                                    placeholder='Experience (e.g. 2 years)'
                                    className='w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 hover:bg-white'
                                    onChange={(e) => setExperience(e.target.value)}
                                    value={experience}
                                />
                            </div>

                            {/* Mode Select */}
                            <div className='relative group'>
                                <select
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className='w-full py-3.5 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:bg-white appearance-none cursor-pointer'
                                >
                                    <option value="Technical">💻 Technical Interview</option>
                                    <option value="HR">🤝 HR Interview</option>
                                </select>
                                <div className='absolute right-4 top-4 pointer-events-none'>
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Resume Upload - FIXED BUTTON */}
                            {!analysisDone && (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className='border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 group'
                                >
                                    <div onClick={() => document.getElementById("resumeUpload").click()}>
                                        <div className='relative'>
                                            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-500' />
                                            <FaFileUpload className='text-5xl mx-auto text-gray-400 group-hover:text-blue-500 transition-colors mb-3' />
                                            <input
                                                type="file"
                                                accept="application/pdf"
                                                id="resumeUpload"
                                                className='hidden'
                                                onChange={(e) => setResumeFile(e.target.files[0])}
                                            />
                                            <p className='text-gray-600 font-medium'>
                                                {resumeFile ? resumeFile.name : "📄 Click to upload resume (Optional)"}
                                            </p>
                                            <p className='text-gray-400 text-xs mt-1'>Supports PDF format</p>
                                        </div>
                                    </div>

                                    {/* ANALYZE BUTTON - Properly Working */}
                                    {resumeFile && (
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleUploadResume()
                                            }}
                                            disabled={analyzing}
                                            className={`mt-4 px-8 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                                                analyzing 
                                                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30'
                                            }`}
                                        >
                                            {analyzing ? (
                                                <span className='flex items-center gap-2'>
                                                    <FaSpinner className='animate-spin' />
                                                    Analyzing...
                                                </span>
                                            ) : (
                                                <span className='flex items-center gap-2'>
                                                    🔍 Analyze Resume
                                                </span>
                                            )}
                                        </motion.button>
                                    )}
                                </motion.div>
                            )}

                            {/* Resume Analysis Result */}
                            {analysisDone && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className='bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 space-y-4'
                                >
                                    <div className='flex items-center gap-2'>
                                        <div className='bg-green-500/20 p-1.5 rounded-lg'>
                                            <FaCheckCircle className='text-green-500 text-lg' />
                                        </div>
                                        <h3 className='text-lg font-semibold text-gray-800'>Resume Analysis</h3>
                                        <span className='ml-auto text-xs px-3 py-1 bg-green-500/20 text-green-600 rounded-full font-medium'>✓ Complete</span>
                                    </div>

                                    {projects.length > 0 && (
                                        <div>
                                            <p className='font-medium text-gray-700 mb-2 text-sm'>📁 Projects:</p>
                                            <ul className='space-y-1.5'>
                                                {projects.map((p, i) => (
                                                    <li key={i} className='text-sm text-gray-600 bg-white/60 px-3 py-2 rounded-lg flex items-center gap-2 border border-green-100'>
                                                        <span className='w-1.5 h-1.5 bg-green-400 rounded-full' />
                                                        {p}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {skills.length > 0 && (
                                        <div>
                                            <p className='font-medium text-gray-700 mb-2 text-sm'>⚡ Skills:</p>
                                            <div className='flex flex-wrap gap-2'>
                                                {skills.map((s, i) => (
                                                    <span key={i} className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-sm'>
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Start Button */}
                            <motion.button
                                onClick={handleStart}
                                disabled={!role || !experience || loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                                    !role || !experience || loading
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <FaSpinner className='animate-spin' />
                                        Starting Interview...
                                    </>
                                ) : (
                                    <>
                                        <FaRocket />
                                        Start Interview
                                        <FaArrowRight />
                                    </>
                                )}
                            </motion.button>

                            <div className='flex items-center justify-between text-xs'>
                                <p className='text-gray-400'>
                                    {userData?.credits > 0 ? (
                                        <span className='flex items-center gap-1'>
                                            <span className='w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse' />
                                            {userData.credits} credits remaining
                                        </span>
                                    ) : (
                                        <span className='text-red-400'>⚠️ No credits remaining</span>
                                    )}
                                </p>
                                <div className='flex items-center gap-2 text-gray-300'>
                                    <span>🔒 Secure</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp