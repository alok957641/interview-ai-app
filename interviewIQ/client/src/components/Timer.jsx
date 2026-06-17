import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaClock } from 'react-icons/fa';
import { motion } from "motion/react";

function Timer({ timeLeft, totalTime }) {
    const percentage = (timeLeft / totalTime) * 100;
    
    // Dynamic colors based on time left
    const getColors = () => {
        if (percentage > 50) {
            return {
                path: "#10b981", // Green
                text: "#10b981",
                trail: "#d1fae5",
                bg: "from-emerald-500 to-teal-500"
            };
        } else if (percentage > 25) {
            return {
                path: "#f59e0b", // Amber
                text: "#f59e0b",
                trail: "#fef3c7",
                bg: "from-amber-500 to-yellow-500"
            };
        } else {
            return {
                path: "#ef4444", // Red
                text: "#ef4444",
                trail: "#fecaca",
                bg: "from-red-500 to-rose-500"
            };
        }
    };

    const colors = getColors();

    // Format time display
    const formatTime = (seconds) => {
        if (seconds >= 60) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
        return `${seconds}s`;
    };

    return (
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative w-24 h-24 sm:w-28 sm:h-28"
        >
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg} rounded-full blur-xl opacity-20 animate-pulse`} />
            
            {/* Main Timer */}
            <div className="relative w-full h-full">
                <CircularProgressbar
                    value={percentage}
                    text={formatTime(timeLeft)}
                    styles={buildStyles({
                        textSize: "24px",
                        pathColor: colors.path,
                        textColor: colors.text,
                        trailColor: colors.trail,
                        pathTransitionDuration: 0.5,
                        strokeLinecap: "round",
                    })}
                />
            </div>

            {/* Small Label Below Timer */}
            {timeLeft <= 10 && timeLeft > 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                    <span className="text-[8px] sm:text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 animate-pulse">
                        ⚡ Hurry!
                    </span>
                </motion.div>
            )}

            {/* Time Up State */}
            {timeLeft === 0 && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                >
                    <span className="text-[8px] sm:text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-300">
                        ⏰ Time's Up!
                    </span>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Timer