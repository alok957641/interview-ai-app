import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle, FaCrown, FaRocket, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting interview preparation.",
      icon: <FaStar className="text-yellow-400" />,
      gradient: "from-gray-50 to-gray-100",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and skill improvement.",
      icon: <FaRocket className="text-blue-400" />,
      gradient: "from-blue-50 to-indigo-50",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback",
        "Performance Analytics",
        "Full Interview History",
      ],
      popular: true,
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value for serious job preparation.",
      icon: <FaCrown className="text-yellow-500" />,
      gradient: "from-amber-50 to-orange-50",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Feedback",
        "Skill Trend Analysis",
        "Priority AI Processing",
      ],
      badge: "Best Value",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =  
      plan.id === "basic" ? 100 :
      plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },{withCredentials:true})
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler:async function (response) {
          const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
          dispatch(setUserData(verifypay.data.user))
          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")
        },
        theme:{
          color: "#10b981",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
      setLoadingPlan(null);
    } catch (error) {
      console.log(error)
      setLoadingPlan(null);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 py-12 px-4 sm:px-6'>

      {/* Header */}
      <div className='max-w-6xl mx-auto mb-12 flex items-center gap-4'>
        <button 
          onClick={() => navigate("/")} 
          className='p-3 rounded-2xl bg-white shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100'
        >
          <FaArrowLeft className='text-gray-600 text-lg' />
        </button>

        <div className="text-center flex-1">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800"
          >
            Choose Your <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Plan</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-2 sm:mt-3 text-base sm:text-lg"
          >
            Flexible pricing to match your interview preparation goals.
          </motion.p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id

          return (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`
                relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 
                transition-all duration-300 
                border-2 
                ${isSelected 
                  ? "border-emerald-500 shadow-2xl shadow-emerald-500/20 bg-white" 
                  : "border-gray-200/80 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
                }
                ${plan.default ? "cursor-default" : "cursor-pointer"}
                hover:border-emerald-300
              `}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-emerald-500/30">
                    🌟 Most Popular
                  </span>
                </div>
              )}

              {/* Best Value Badge */}
              {plan.badge && !plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg shadow-amber-500/30">
                    ⭐ {plan.badge}
                  </span>
                </div>
              )}

              {/* Default Tag */}
              {plan.default && (
                <div className="absolute top-4 right-4 bg-gray-200/80 backdrop-blur-sm text-gray-600 text-xs font-semibold px-3 py-1 rounded-full border border-gray-300">
                  Default
                </div>
              )}

              {/* Plan Icon */}
              <div className="text-3xl sm:text-4xl mb-3">
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600">
                  {plan.price}
                </span>
                <span className="text-gray-400 text-sm ml-1">/one-time</span>
                <p className="text-gray-500 text-sm mt-1 font-medium">
                  {plan.credits} Credits
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-500 mt-4 text-sm leading-relaxed border-t border-gray-100 pt-4">
                {plan.description}
              </p>

              {/* Features */}
              <div className="mt-5 space-y-3 text-left">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 group">
                    <FaCheckCircle className={`text-emerald-500 text-sm mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110 ${isSelected ? 'text-emerald-500' : 'text-gray-400'}`} />
                    <span className={`text-sm ${isSelected ? 'text-gray-700' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              {!plan.default && (
                <button
                  disabled={loadingPlan === plan.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSelected) {
                      setSelectedPlan(plan.id)
                    } else {
                      handlePayment(plan)
                    }
                  }} 
                  className={`
                    w-full mt-7 py-3.5 rounded-xl font-bold text-sm sm:text-base
                    transition-all duration-300
                    ${isSelected 
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02]" 
                      : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                    }
                    ${loadingPlan === plan.id ? "opacity-70 cursor-not-allowed" : ""}
                    border-2 ${isSelected ? "border-emerald-500" : "border-transparent hover:border-emerald-200"}
                  `}
                >
                  {loadingPlan === plan.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : isSelected ? (
                    "🚀 Proceed to Pay"
                  ) : (
                    "Select Plan →"
                  )}
                </button>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Trust Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-6xl mx-auto mt-12 text-center"
      >
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500">✓</span> Secure Payment
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500">✓</span> Instant Credits
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500">✓</span> 100% Money Back
          </span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-500">✓</span> 24/7 Support
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default Pricing
