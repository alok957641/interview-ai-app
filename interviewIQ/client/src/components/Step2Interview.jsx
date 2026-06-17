import React from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion, AnimatePresence } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash, FaRobot, FaUser, FaCheckCircle, FaSpinner, FaArrowRight, FaClock, FaQuestionCircle } from "react-icons/fa";
import { BsStars, BsLightning } from "react-icons/bs";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const femaleVoice = voices.find(v =>
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("female")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find(v =>
        v.name.toLowerCase().includes("david") ||
        v.name.toLowerCase().includes("mark") ||
        v.name.toLowerCase().includes("male")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);
      utterance.voice = selectedVoice;
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic()
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) return;
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );
        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );
        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));

        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }
    }
    runIntro()
  }, [selectedVoice, isIntroPhase, currentIndex])

  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0;
        }
        return prev - 1
      })
    }, 1000);
    return () => clearInterval(timer)
  }, [isIntroPhase, currentIndex])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;
  }, []);

  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };

  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken: currentQuestion.timeLimit - timeLeft,
      }, { withCredentials: true })

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");
    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);
  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl + "/api/interview/finish", { interviewId }, { withCredentials: true })
      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center p-3 sm:p-6'>
      <div className='w-full max-w-7xl min-h-[80vh] bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 border border-white/50 flex flex-col lg:flex-row overflow-hidden'>

        {/* LEFT - Video Section */}
        <div className='w-full lg:w-[38%] bg-gradient-to-br from-slate-50 to-blue-50/50 flex flex-col items-center p-4 sm:p-6 space-y-4 border-r border-gray-200/50'>
          
          {/* Video Container */}
          <div className='relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl shadow-blue-500/10 border-2 border-white/50'>
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-auto object-cover"
            />
            
            {/* AI Speaking Badge */}
            {isAIPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2'
              >
                <span className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse' />
                <span className='text-white text-[10px] font-medium tracking-wider'>AI SPEAKING</span>
              </motion.div>
            )}
          </div>

          {/* Subtitle */}
          <AnimatePresence>
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='w-full max-w-sm bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl p-3 shadow-sm'
              >
                <p className='text-gray-700 text-xs sm:text-sm font-medium text-center leading-relaxed'>
                  "{subtitle}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status Card */}
          <div className='w-full max-w-sm bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm p-5 space-y-4'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2'>
                <div className={`w-2 h-2 rounded-full ${isAIPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gray-300'}`} />
                <span className='text-xs text-gray-500 font-medium'>
                  {isAIPlaying ? 'AI Speaking' : isIntroPhase ? 'Preparing...' : 'Listening...'}
                </span>
              </div>
              <div className='flex items-center gap-1.5 text-xs text-gray-400'>
                <FaRobot className='text-emerald-500' />
                <span>AI Interviewer</span>
              </div>
            </div>

            <div className="h-px bg-gray-200/50" />

            {/* Timer */}
            <div className='flex justify-center'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-gray-200/50" />

            {/* Progress */}
            <div className='grid grid-cols-2 gap-4 text-center'>
              <div className='bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3'>
                <p className='text-2xl font-bold text-emerald-600'>{currentIndex + 1}</p>
                <p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider'>Current</p>
              </div>
              <div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3'>
                <p className='text-2xl font-bold text-blue-600'>{questions.length}</p>
                <p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider'>Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - Main Interview Section */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative'>
          
          {/* Header */}
          <div className='flex items-center justify-between mb-4 sm:mb-6'>
            <div className='flex items-center gap-3'>
              <div className='bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20'>
                <BsStars className='text-white text-lg' />
              </div>
              <div>
                <h2 className='text-lg sm:text-xl font-bold text-gray-800'>
                  AI Smart Interview
                </h2>
                <p className='text-[10px] text-gray-400 tracking-wider'>
                  {isIntroPhase ? 'Preparing...' : `Question ${currentIndex + 1} of ${questions.length}`}
                </p>
              </div>
            </div>
            
            {/* Voice Indicator */}
            <div 
              onClick={toggleMic}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                isMicOn ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              {isMicOn ? (
                <FaMicrophone className='text-emerald-500 text-sm' />
              ) : (
                <FaMicrophoneSlash className='text-red-500 text-sm' />
              )}
              <span className={`text-[10px] font-medium ${isMicOn ? 'text-emerald-600' : 'text-red-500'}`}>
                {isMicOn ? 'Active' : 'Muted'}
              </span>
            </div>
          </div>

          {/* Question Box */}
          {!isIntroPhase && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='relative mb-4 sm:mb-6 bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6 rounded-2xl border border-gray-200/50 shadow-sm'
            >
              <div className='flex items-start gap-3'>
                <div className='bg-gradient-to-br from-emerald-500 to-teal-500 p-1.5 rounded-lg shrink-0 mt-0.5'>
                  <FaQuestionCircle className='text-white text-xs' />
                </div>
                <div>
                  <p className='text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1'>
                    Question {currentIndex + 1}
                  </p>
                  <p className='text-sm sm:text-base font-semibold text-gray-800 leading-relaxed'>
                    {currentQuestion?.question}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Answer Textarea */}
          <div className='relative flex-1'>
            <textarea
              placeholder={isIntroPhase ? "Get ready for your interview..." : "Type your answer here or use voice input..."}
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              disabled={isIntroPhase}
              className="w-full h-32 sm:h-48 bg-gray-50/80 p-4 sm:p-6 rounded-2xl resize-none outline-none border border-gray-200/80 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 text-gray-800 placeholder:text-gray-400/60 disabled:opacity-50"
            />
            
            {/* Answer Length Indicator */}
            {answer.length > 0 && (
              <div className='absolute bottom-3 right-3 text-[10px] text-gray-400'>
                {answer.length} characters
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!feedback ? (
            <div className='flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6'>
              <motion.button
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                  isMicOn 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-xl hover:shadow-emerald-500/30' 
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              >
                {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting || isIntroPhase || !answer.trim()}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting || isIntroPhase || !answer.trim()
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className='animate-spin' />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    Submit Answer
                  </>
                )}
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-4 sm:mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 p-4 sm:p-5 rounded-2xl shadow-sm'
            >
              <div className='flex items-start gap-3'>
                <div className='bg-emerald-500/20 p-1.5 rounded-lg shrink-0'>
                  <BsLightning className='text-emerald-600' />
                </div>
                <div className='flex-1'>
                  <p className='text-emerald-700 font-medium text-sm sm:text-base leading-relaxed'>
                    {feedback}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={handleNext}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className='w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2 font-semibold'
              >
                {currentIndex + 1 >= questions.length ? 'Finish Interview' : 'Next Question'}
                <FaArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}

          {/* Progress Bar */}
          {!isIntroPhase && (
            <div className='mt-4 sm:mt-6'>
              <div className='flex justify-between text-[10px] text-gray-400 mb-1'>
                <span>Progress</span>
                <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
              </div>
              <div className='w-full h-1.5 bg-gray-200/60 rounded-full overflow-hidden'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className='h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full'
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2Interview