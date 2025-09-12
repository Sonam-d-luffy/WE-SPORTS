import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Shield, Home, RefreshCw, Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const Otp = () => {
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  
  const location = useLocation()
  const {gamerId} = location.state || {}
  const navigate = useNavigate()

  const handleOTPverification = async(e) => {
    e.preventDefault()
    setLoading(true)
    if(!gamerId){
      setMessage('No gamer id found , please sign in first')
      setLoading(false)
      //console.log(message)
      return
    }
    //console.log(gamerId)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify/verify-email` , {gamerId , otp})
      if(res.data.success){
        setMessage(res.data.message || 'OTP verification complete')
        alert("You are verified successfully , please login to book slots")
        setTimeout(() => navigate('/gamerLogin') , 1500)
      }else {
        setMessage('wrong otp')
      }
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResendLoading(true)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify/resend-otp`, { gamerId });
      setMessage(`New OTP sent: ${res.data.otp}`); // ❌ for testing, remove later
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error resending OTP');
    } finally{
      setResendLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-purple-300 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
          Back
        </button>

        {/* Main card */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mb-4 animate-bounce">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
              Verify Your Account
            </h2>
            <p className="text-purple-200 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Enter the OTP sent to your email
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleOTPverification} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-purple-300 text-center text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                maxLength="6"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

            <button
              type="submit"
              disabled={loading || !otp.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Verify OTP
                </>
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-6 text-center">
            <p className="text-purple-300 mb-3">Didn't receive the code?</p>
            <button
              onClick={handleResendOTP}
              disabled={resendLoading}
              className="text-purple-400 hover:text-white font-medium transition-colors duration-200 flex items-center justify-center gap-2 mx-auto group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Resend OTP
                </>
              )}
            </button>
          </div>

          {/* Message display */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl border backdrop-blur-sm animate-fadeIn ${
              message.includes('complete') || message.includes('sent') 
                ? 'bg-green-500/10 border-green-400/30 text-green-300' 
                : 'bg-red-500/10 border-red-400/30 text-red-300'
            }`}>
              <div className="flex items-center gap-3">
                {message.includes('complete') || message.includes('sent') ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm">{message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-purple-400 hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 mx-auto group"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style >{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Otp