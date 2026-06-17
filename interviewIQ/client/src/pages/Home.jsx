import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion, useInView } from "motion/react";
import {
  BsRobot, BsMic, BsClock, BsBarChart,
  BsFileEarmarkText, BsArrowRight,
  BsLightningChargeFill, BsShieldCheck, BsTrophyFill
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Heroimg from "../assets/Cover6_1.png.webp";
import Footer from '../components/Footer';

/* ── Typing hook ── */
function useTyping(lines, speed = 40) {
  const [display, setDisplay] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = lines[lineIdx];
    let t;
    if (!deleting && charIdx < current.length) {
      t = setTimeout(() => setCharIdx(c => c + 1), speed + Math.random() * 18);
    } else if (!deleting && charIdx === current.length) {
      t = setTimeout(() => setDeleting(true), 2800);
    } else if (deleting && charIdx > 0) {
      t = setTimeout(() => setCharIdx(c => c - 1), 14);
    } else {
      setDeleting(false);
      setLineIdx(i => (i + 1) % lines.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(t);
  }, [charIdx, deleting, lineIdx, lines, speed]);
  return display;
}

/* ── Animated counter ── */
function AnimCount({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const end = parseInt(target);
    const step = Math.ceil(end / (1600 / 16));
    const t = setInterval(() => {
      n += step;
      if (n >= end) { setCount(end); clearInterval(t); }
      else setCount(n);
    }, 16);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const typingLines = [
  "Design a system handling 10M concurrent users...",
  "Explain the difference between TCP and UDP...",
  "Walk me through your most challenging project...",
  "How would you optimize a slow SQL query?",
];

export default function Home() {
  const { userData } = useSelector(s => s.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const typed = useTyping(typingLines);

  const go = (path) => {
    if (!userData) { setShowAuth(true); return; }
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <Navbar />

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes floatA { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,20px)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,30px)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-25px)} }
        .blob { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
        .blob1 { width:500px;height:500px;background:#ddd6fe;opacity:0.55;top:-100px;left:-100px;animation:floatA 14s ease-in-out infinite; }
        .blob2 { width:400px;height:400px;background:#a7f3d0;opacity:0.45;bottom:-60px;right:-60px;animation:floatB 18s ease-in-out infinite; }
        .blob3 { width:300px;height:300px;background:#fecdd3;opacity:0.35;top:35%;left:55%;animation:floatC 22s ease-in-out infinite; }

        .white-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1.5px solid #e5e7eb;
          transition: all 0.3s cubic-bezier(.4,0,.2,1);
        }
        .white-card:hover {
          border-color: #c4b5fd;
          box-shadow: 0 20px 60px rgba(139,92,246,0.10), 0 4px 16px rgba(0,0,0,0.06);
          transform: translateY(-5px);
        }

        .step-ghost {
          position:absolute; top:16px; right:20px;
          font-size:80px; font-weight:900;
          color:rgba(139,92,246,0.07);
          line-height:1; user-select:none;
        }

        .gradient-text {
          background: linear-gradient(90deg,#7c3aed,#059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sec-label {
          font-size:11px; font-weight:800;
          letter-spacing:3px; text-transform:uppercase;
          color:#7c3aed; margin-bottom:12px;
          display:block;
        }

        .tag {
          display:inline-block; font-size:11px; font-weight:700;
          letter-spacing:1.5px; text-transform:uppercase;
          padding:4px 12px; border-radius:999px; margin-bottom:14px;
        }
        .tag-v { background:#f5f3ff; color:#7c3aed; border:1px solid #ddd6fe; }
        .tag-g { background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; }
        .tag-a { background:#fffbeb; color:#d97706; border:1px solid #fde68a; }
        .tag-r { background:#fff1f2; color:#e11d48; border:1px solid #fecdd3; }

        .icon-box {
          width:44px; height:44px; border-radius:14px;
          display:flex; align-items:center; justify-content:center;
          margin-bottom:16px;
        }
        .icon-v { background:#f5f3ff; border:1px solid #ddd6fe; color:#7c3aed; }
        .icon-g { background:#ecfdf5; border:1px solid #a7f3d0; color:#059669; }
        .icon-a { background:#fffbeb; border:1px solid #fde68a; color:#d97706; }
        .icon-r { background:#fff1f2; border:1px solid #fecdd3; color:#e11d48; }

        .score-pill {
          display:inline-flex; align-items:center; gap:5px;
          font-size:12px; font-weight:600;
          padding:4px 12px; border-radius:999px;
        }

        .btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#7c3aed,#6d28d9);
          color:#fff; padding:14px 34px; border-radius:999px;
          font-weight:700; font-size:16px; border:none; cursor:pointer;
          box-shadow:0 8px 28px rgba(124,58,237,0.32);
          transition:all .25s;
        }
        .btn-primary:hover { transform:translateY(-2px) scale(1.04); box-shadow:0 14px 36px rgba(124,58,237,0.4); }

        .btn-ghost {
          display:inline-flex; align-items:center; gap:8px;
          background:#fff; color:#374151;
          padding:14px 34px; border-radius:999px;
          font-weight:600; font-size:16px;
          border:1.5px solid #e5e7eb; cursor:pointer;
          box-shadow:0 2px 8px rgba(0,0,0,0.05);
          transition:all .25s;
        }
        .btn-ghost:hover { border-color:#c4b5fd; color:#7c3aed; transform:translateY(-1px); }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative px-4 sm:px-6 pt-24 pb-20 overflow-hidden">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Grid: Left Text + Right Image */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT - Text Content */}
            <div>
              <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.5}}
                className="flex mb-6">
                <span className="inline-flex items-center gap-2 bg-white border border-violet-200 text-violet-600 text-sm px-5 py-2 rounded-full shadow-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" style={{boxShadow:'0 0 8px #34d399'}} />
                  <HiSparkles size={14}/>
                  AI-Powered Smart Interview
                </span>
              </motion.div>

              <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.65}}
                className="font-black leading-[1.06] tracking-tight mb-4 text-gray-900"
                style={{fontSize:'clamp(32px,5vw,56px)'}}>
                Practice Smarter.{' '}
                <span className="gradient-text">Get Hired Faster.</span>
              </motion.h1>

              <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.8,delay:.15}}
                className="text-gray-500 text-lg max-w-lg leading-relaxed mb-8">
                Role-based mock interviews with smart follow-ups, adaptive difficulty
                and real-time performance evaluation — all powered by AI.
              </motion.p>

              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.25}}
                className="flex flex-wrap gap-4">
                <button onClick={() => go("/interview")} className="btn-primary group">
                  Start Interview <BsArrowRight className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <button onClick={() => go("/history")} className="btn-ghost">
                  View History
                </button>
              </motion.div>
            </div>

            {/* RIGHT - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-md">
                <img 
                  src={Heroimg} 
                  alt="AI Interview" 
                  className="w-full h-auto rounded-2xl "
                />
              </div>
            </motion.div>
          </div>

          {/* terminal — white card */}
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.35}}
            className="max-w-3xl mx-auto white-card overflow-hidden mt-16"
            style={{boxShadow:'0 8px 40px rgba(124,58,237,0.10), 0 2px 12px rgba(0,0,0,0.06)'}}>
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-auto text-xs font-semibold text-gray-400">Live AI Session · Senior Engineer</span>
            </div>
            <div className="p-6 space-y-4 font-mono text-sm">
              <div className="flex gap-3">
                <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg h-fit bg-violet-100 text-violet-600">AI</span>
                <p className="text-gray-700 leading-relaxed min-h-[44px]">
                  {typed}
                  <span className="inline-block w-[2px] h-[14px] ml-0.5 align-middle bg-violet-500"
                    style={{animation:'blink 1s step-end infinite'}} />
                </p>
              </div>
              <div className="flex gap-3">
                <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg h-fit bg-emerald-100 text-emerald-600">You</span>
                <p className="text-gray-500 leading-relaxed">
                  I'd check slow query logs first, add indexes on frequently filtered columns, and restructure to avoid N+1 issues...
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="score-pill bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <BsLightningChargeFill size={10}/> Technical: 91%
                </span>
                <span className="score-pill bg-violet-50 text-violet-700 border border-violet-200">
                  <BsShieldCheck size={10}/> Confidence: High
                </span>
                <span className="score-pill bg-amber-50 text-amber-700 border border-amber-200">
                  <BsClock size={10}/> Avg: 28s
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {n:94,s:'%',label:'Users feel confident'},
            {n:50,s:'+',label:'Job roles supported'},
            {n:12,s:'K+',label:'Interviews completed'},
            {n:4,s:'.9★',label:'Average rating'},
          ].map((item,i)=>(
            <motion.div key={i}
              initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
              transition={{duration:.4,delay:i*.08}}
              className="white-card p-5 text-center">
              <div className="text-3xl font-black gradient-text">
                <AnimCount target={item.n} suffix={item.s}/>
              </div>
              <div className="text-sm mt-1 text-gray-500">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:.5}} className="text-center mb-14">
            <span className="sec-label">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              Three steps to <span className="gradient-text">interview-ready</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {icon:<BsRobot size={22}/>,step:'01',title:'Pick Your Role',desc:'Select your job title and experience level. AI calibrates every question to your exact profile and difficulty bracket.',ic:'icon-v',tc:'tag-v',highlight:false},
              {icon:<BsMic size={22}/>,step:'02',title:'Answer Naturally',desc:'Speak or type your answers. Smart follow-up questions adapt dynamically based on what you say — just like a real interview.',ic:'icon-g',tc:'tag-g',highlight:true},
              {icon:<BsBarChart size={22}/>,step:'03',title:'Get Scored Instantly',desc:'Detailed performance breakdown — technical depth, communication and confidence — with actionable feedback.',ic:'icon-v',tc:'tag-v',highlight:false},
            ].map((item,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:.5,delay:i*.12}}
                className={`white-card relative p-8 ${item.highlight ? 'border-emerald-300' : ''}`}
                style={item.highlight ? {borderColor:'#6ee7b7'} : {}}>
                {item.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full"
                    style={{background:'linear-gradient(90deg,#059669,#34d399)',boxShadow:'0 4px 12px rgba(5,150,105,0.3)'}}>
                    Most Used
                  </span>
                )}
                <div className="step-ghost">{item.step}</div>
                <div className={`icon-box ${item.ic}`}>{item.icon}</div>
                <span className={`tag ${item.tc}`}>Step {item.step}</span>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:.5}} className="text-center mb-14">
            <span className="sec-label">Features</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              Advanced AI <span className="gradient-text">Capabilities</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {image:evalImg,  icon:<BsBarChart size={20}/>,      tag:'AI Evaluation', tc:'tag-v', ic:'icon-v', title:'Real-Time Answer Scoring',   desc:'Evaluated across communication clarity, technical accuracy, and confidence — with a detailed score breakdown after each answer.'},
              {image:resumeImg,icon:<BsFileEarmarkText size={20}/>,tag:'Resume AI',     tc:'tag-g', ic:'icon-g', title:'Resume-Driven Questions',    desc:'Upload your CV and get questions tailored to your exact projects, tech stack, and experience. Nothing generic.'},
              {image:pdfImg,   icon:<BsFileEarmarkText size={20}/>,tag:'Reports',       tc:'tag-a', ic:'icon-a', title:'Downloadable PDF Report',    desc:'Structured post-interview report with scores, strengths, weak spots, and a concrete improvement roadmap.'},
              {image:analyticsImg,icon:<BsBarChart size={20}/>,   tag:'Analytics',     tc:'tag-r', ic:'icon-r', title:'History & Analytics',        desc:'Track your growth with performance graphs, topic-wise analysis, and streak-based milestones.'},
            ].map((item,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:.5,delay:i*.1}}
                whileHover={{scale:1.02}}
                className="white-card p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-full sm:w-[42%] bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-100">
                    <img src={item.image} alt={item.title} className="w-full max-h-48 object-contain"/>
                  </div>
                  <div className="w-full sm:w-[58%]">
                    <span className={`tag ${item.tc}`}>{item.tag}</span>
                    <div className={`icon-box ${item.ic}`}>{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODES ── */}
      <section className="px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
            transition={{duration:.5}} className="text-center mb-14">
            <span className="sec-label">Modes</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              Multiple Interview <span className="gradient-text">Modes</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {img:hrImg,        icon:'🧑‍💼', title:'HR Interview Mode',    desc:'Behavioral and communication-based evaluation to master culture-fit and situational rounds.'},
              {img:techImg,      icon:'💻',  title:'Technical Mode',       desc:'Deep system design and role-specific technical questioning at your exact seniority level.'},
              {img:confidenceImg,icon:'🧠',  title:'Confidence Detection', desc:'Voice tone and pacing analysis — know exactly where you sound hesitant or rushed.'},
              {img:creditImg,    icon:'⚡',  title:'Credits System',       desc:'Unlock premium interview sessions with a simple, transparent credits system.'},
            ].map((mode,i)=>(
              <motion.div key={i}
                initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{duration:.5,delay:i*.1}}
                whileHover={{y:-5}}
                className="white-card p-6 sm:p-8">
                <div className="flex items-center gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="text-3xl mb-3">{mode.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{mode.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{mode.desc}</p>
                  </div>
                  <div className="shrink-0 w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    <img src={mode.img} alt={mode.title} className="w-20 h-20 object-contain"/>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      {showAuth && <AuthModel onClose={() => setShowAuth(false)}/>}
      <Footer/>
    </div>
  );
}