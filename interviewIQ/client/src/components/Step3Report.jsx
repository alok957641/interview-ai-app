import React from 'react'
import { FaArrowLeft, FaDownload, FaStar, FaChartLine, FaBrain, FaLightbulb, FaCheckCircle, FaClock } from 'react-icons/fa';
import { BsStars, BsTrophy } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-green-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Loading Report...</p>
        </motion.div>
      </div>
    );
  }

  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence, color: "from-blue-500 to-cyan-500", icon: <FaBrain /> },
    { label: "Communication", value: communication, color: "from-purple-500 to-pink-500", icon: <FaChartLine /> },
    { label: "Correctness", value: correctness, color: "from-emerald-500 to-teal-500", icon: <FaCheckCircle /> },
  ];

  let performanceText = "";
  let shortTagline = "";
  let emoji = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
    emoji = "🏆";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
    emoji = "💪";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
    emoji = "📈";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;

  const downloadPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let currentY = 25;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129);
    doc.text("✨ AI Interview Performance Report", pageWidth / 2, currentY, { align: "center" });
    currentY += 5;
    doc.setDrawColor(16, 185, 129);
    doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);
    currentY += 15;

    doc.setFillColor(240, 253, 244);
    doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`🎯 Final Score: ${finalScore}/10`, pageWidth / 2, currentY + 12, { align: "center" });
    currentY += 30;

    doc.setFillColor(249, 250, 251);
    doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");
    doc.setFontSize(12);
    doc.text(`🧠 Confidence: ${confidence}`, margin + 10, currentY + 10);
    doc.text(`💬 Communication: ${communication}`, margin + 10, currentY + 18);
    doc.text(`✅ Correctness: ${correctness}`, margin + 10, currentY + 26);
    currentY += 45;

    let advice = "";
    if (finalScore >= 8) {
      advice = "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
    } else if (finalScore >= 5) {
      advice = "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
    } else {
      advice = "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(220);
    doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);
    doc.setFont("helvetica", "bold");
    doc.text("💡 Professional Advice", margin + 10, currentY + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
    doc.text(splitAdvice, margin + 10, currentY + 20);
    currentY += 50;

    autoTable(doc, {
      startY: currentY,
      margin: { left: margin, right: margin },
      head: [["#", "Question", "Score", "Feedback"]],
      body: questionWiseScore.map((q, i) => [`${i + 1}`, q.question, `${q.score}/10`, q.feedback]),
      styles: { fontSize: 9, cellPadding: 5, valign: "top" },
      headStyles: { fillColor: [16, 185, 129], textColor: 255, halign: "center" },
      columnStyles: {
        0: { cellWidth: 10, halign: "center" },
        1: { cellWidth: 55 },
        2: { cellWidth: 20, halign: "center" },
        3: { cellWidth: "auto" },
      },
      alternateRowStyles: { fillColor: [249, 250, 251] },
    });

    doc.save("AI_Interview_Report.pdf");
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-emerald-50/30 px-3 sm:px-6 lg:px-10 py-6 sm:py-8'>
      
      {/* Header */}
      <div className='mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex items-start gap-3 sm:gap-4 flex-wrap'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/history")}
            className='mt-1 p-3 rounded-full bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100'
          >
            <FaArrowLeft className='text-gray-600' />
          </motion.button>

          <div>
            <div className='flex items-center gap-2'>
              <BsStars className='text-emerald-500 text-2xl' />
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800'>
                Interview Analytics
              </h1>
            </div>
            <p className='text-gray-400 text-xs sm:text-sm mt-1 flex items-center gap-2'>
              <span className='w-1.5 h-1.5 bg-emerald-400 rounded-full' />
              AI-powered performance insights
              <span className='w-1.5 h-1.5 bg-emerald-400 rounded-full' />
              {questionWiseScore.length} questions analyzed
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={downloadPDF}
          className='bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 font-semibold text-sm sm:text-base flex items-center gap-2 whitespace-nowrap'
        >
          <FaDownload size={16} />
          Download Report
        </motion.button>
      </div>

      {/* Main Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8'>
        
        {/* LEFT COLUMN */}
        <div className='space-y-5 sm:space-y-6'>
          
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 p-5 sm:p-7 text-center"
          >
            <div className='flex items-center justify-center gap-2 mb-3'>
              <BsTrophy className='text-yellow-500 text-xl' />
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium uppercase tracking-wider">
                Overall Performance
              </h3>
            </div>
            
            <div className='relative w-24 h-24 sm:w-28 sm:h-28 mx-auto'>
              <CircularProgressbar
                value={percentage}
                text={`${score}/10`}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: finalScore >= 8 ? "#10b981" : finalScore >= 5 ? "#f59e0b" : "#ef4444",
                  textColor: "#1f2937",
                  trailColor: "#e5e7eb",
                  pathTransitionDuration: 1.5,
                })}
              />
            </div>

            <div className="mt-3">
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                {emoji} {finalScore}/10
              </p>
              <p className="font-semibold text-gray-700 text-sm sm:text-base mt-1">
                {performanceText}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                {shortTagline}
              </p>
            </div>
          </motion.div>

          {/* Skills Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 p-5 sm:p-7'
          >
            <div className='flex items-center gap-2 mb-5'>
              <FaBrain className='text-purple-500 text-lg' />
              <h3 className="text-sm sm:text-base font-bold text-gray-700">
                Skill Evaluation
              </h3>
            </div>

            <div className='space-y-4'>
              {skills.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <div className='flex justify-between items-center mb-1.5'>
                    <div className='flex items-center gap-2'>
                      <span className={`text-${s.value >= 7 ? 'emerald' : s.value >= 5 ? 'amber' : 'red'}-500 text-xs`}>
                        {s.icon}
                      </span>
                      <span className='text-xs sm:text-sm font-medium text-gray-600'>{s.label}</span>
                    </div>
                    <span className={`font-bold text-sm ${s.value >= 7 ? 'text-emerald-600' : s.value >= 5 ? 'text-amber-600' : 'text-red-500'}`}>
                      {s.value}/10
                    </span>
                  </div>
                  <div className='bg-gray-200/60 h-2 sm:h-2.5 rounded-full overflow-hidden'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value * 10}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Level Badge */}
            <div className='mt-5 pt-4 border-t border-gray-200/50'>
              <div className={`text-center p-2 rounded-xl ${finalScore >= 8 ? 'bg-emerald-50 text-emerald-700' : finalScore >= 5 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
                <p className='text-xs font-semibold'>
                  {finalScore >= 8 ? '🌟 Expert Level' : finalScore >= 5 ? '⚡ Intermediate' : '📚 Beginner'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className='lg:col-span-2 space-y-5 sm:space-y-6'>
          
          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 p-4 sm:p-7'
          >
            <div className='flex items-center justify-between mb-4 sm:mb-6'>
              <div className='flex items-center gap-2'>
                <FaChartLine className='text-emerald-500 text-lg' />
                <h3 className="text-sm sm:text-base font-bold text-gray-700">
                  Performance Trend
                </h3>
              </div>
              <div className='flex items-center gap-1 text-[10px] text-gray-400'>
                <span className='w-2 h-2 bg-emerald-400 rounded-full' />
                Score per question
              </div>
            </div>

            <div className='h-52 sm:h-64'>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={questionScoreData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#scoreGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Summary */}
            <div className='grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-200/50'>
              <div className='text-center'>
                <p className='text-[10px] text-gray-400'>Highest</p>
                <p className='text-sm font-bold text-emerald-600'>
                  {Math.max(...questionScoreData.map(d => d.score))}/10
                </p>
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-gray-400'>Average</p>
                <p className='text-sm font-bold text-blue-600'>
                  {(questionScoreData.reduce((a, b) => a + b.score, 0) / questionScoreData.length || 0).toFixed(1)}/10
                </p>
              </div>
              <div className='text-center'>
                <p className='text-[10px] text-gray-400'>Lowest</p>
                <p className='text-sm font-bold text-amber-600'>
                  {Math.min(...questionScoreData.map(d => d.score))}/10
                </p>
              </div>
            </div>
          </motion.div>

          {/* Question Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 p-4 sm:p-7'
          >
            <div className='flex items-center gap-2 mb-5'>
              <FaLightbulb className='text-amber-500 text-lg' />
              <h3 className="text-sm sm:text-base font-bold text-gray-700">
                Question Breakdown
              </h3>
              <span className='ml-auto text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full'>
                {questionWiseScore.length} questions
              </span>
            </div>

            <div className='space-y-4'>
              {questionWiseScore.map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className='bg-gray-50/80 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200/50 hover:border-emerald-200 hover:shadow-md transition-all duration-300'
                >
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-1'>
                        <span className='text-[10px] font-bold text-gray-400 bg-gray-200/60 px-2 py-0.5 rounded-full'>
                          Q{i + 1}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          q.score >= 8 ? 'bg-emerald-100 text-emerald-700' :
                          q.score >= 5 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {q.score >= 8 ? 'Excellent' : q.score >= 5 ? 'Good' : 'Needs Work'}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                        {q.question || "Question not available"}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap ${
                      q.score >= 8 ? 'bg-emerald-100 text-emerald-700' :
                      q.score >= 5 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {q.score ?? 0}/10
                    </div>
                  </div>

                  <div className='bg-gradient-to-br from-emerald-50/80 to-teal-50/80 border border-emerald-200/50 p-3 sm:p-4 rounded-lg'>
                    <p className='text-[10px] text-emerald-600 font-semibold mb-1 flex items-center gap-1'>
                      <FaCheckCircle size={10} />
                      AI Feedback
                    </p>
                    <p className='text-xs sm:text-sm text-gray-700 leading-relaxed'>
                      {q.feedback && q.feedback.trim() !== ""
                        ? q.feedback
                        : "No feedback available for this question."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report