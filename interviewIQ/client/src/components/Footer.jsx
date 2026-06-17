import React from 'react'
import { BsRobot, BsGithub, BsTwitter, BsLinkedin, BsEnvelope, BsInstagram } from 'react-icons/bs'
import { FaHeart, FaCode } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'

function Footer() {
  return (
    <footer className='bg-[#f3f3f3] px-4 sm:px-6 py-10 sm:py-14 border-t border-gray-200/60'>
      <div className='max-w-6xl mx-auto'>
        
        {/* Main Grid - 3 Sections */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
          
          {/* Left - Brand */}
          <div className='flex flex-col items-center md:items-start text-center md:text-left'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-md opacity-60' />
                <div className='relative bg-gradient-to-br from-gray-900 to-black p-2.5 rounded-xl'>
                  <BsRobot className='text-white text-2xl' />
                </div>
              </div>
              <h2 className='text-2xl font-extrabold tracking-tight'>
                <span className='text-gray-800'>NextHire</span>
                <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>.AI</span>
              </h2>
            </div>
            <p className='text-gray-500 text-sm max-w-xs mt-3 leading-relaxed'>
              AI-powered platform for interview success — communication, technical depth & confidence.
            </p>
            
            {/* Developer Credit - TERA NAAM */}
            <div className='mt-4 flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/80 shadow-sm'>
              <FaCode className='text-blue-500 text-xs' />
              <span className='text-xs text-gray-600'>
                Developed with ❤️ by <span className='font-bold text-gray-800'>Dev Alok</span>
              </span>
            </div>
          </div>

    

          {/* Right - Social + Newsletter */}
          <div className='flex flex-col items-center md:items-end text-center md:text-right'>
            <h3 className='text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3'>
              Connect With Us
            </h3>
            
            {/* Social Icons - Bigger & Better */}
            <div className='flex flex-wrap justify-center md:justify-end gap-3'>
              {[
                { icon: BsGithub, label: 'GitHub', color: 'hover:bg-gray-800 hover:text-white' },
                { icon: BsTwitter, label: 'Twitter', color: 'hover:bg-blue-400 hover:text-white' },
                { icon: BsLinkedin, label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
                { icon: BsInstagram, label: 'Instagram', color: 'hover:bg-pink-600 hover:text-white' },
                { icon: BsEnvelope, label: 'Email', color: 'hover:bg-red-500 hover:text-white' },
              ].map((Social, idx) => (
                <a
                  key={idx}
                  href='#'
                  className={`p-2.5 rounded-xl bg-white border border-gray-200 text-gray-500 ${Social.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                  aria-label={Social.label}
                >
                  <Social.icon className='text-lg' />
                </a>
              ))}
            </div>

            {/* Made with Love - Alok*/}
            <div className='mt-4 flex items-center gap-2 text-xs text-gray-400'>
              <span>© 2026</span>
              <span className='w-1 h-1 bg-gray-300 rounded-full'></span>
              <span className='flex items-center gap-1'>
                Made with <FaHeart className='text-red-400 text-[10px] animate-pulse' /> by <span className='text-gray-700 font-semibold'>Dev Alok</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Glow Line */}
        <div className='mt-10 pt-6 border-t border-gray-200/40'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-3'>
            <p className='text-[10px] text-gray-400/70 tracking-widest'>
              ✦ BUILDING THE FUTURE OF INTERVIEW PREPARATION ✦
            </p>
            <p className='text-[10px] text-gray-400/50 flex items-center gap-1'>
              <span>Proudly</span>
              <span className='text-green-500 text-xs'>🇮🇳</span>
              <span>Made in India</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer