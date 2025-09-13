import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from './UserContext'
import axios from 'axios'

const BookSlots = () => {
  const { gameId, tournamentId } = useParams()
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [gameName, setGameName] = useState('')
  const [amount, setAmount] = useState(0)
  const [agreed, setAgreed] = useState(false)
  const [formdata, setFormdata] = useState({
    username: '',
    instaId: '',
    userId: '',
    rank: ''
  })
  const [paymentData, setPaymentData] = useState(null)
  const [transactionId, setTransactionId] = useState('')
  const tandcpage = () => {
        navigate('/t&c')
  }

  // Fetch game info
  useEffect(() => {
      if(!currentUser){
      alert('Please login to continue')
      navigate('/gamerLogin')
    }
    const fetchGame = async () => {
      try {
        const res = await axios.get(`${process.env.VITE_API_URL}/api/games/${tournamentId}/${gameId}`)
        setGameName(res.data.game.name)
        setAmount(res.data.game.price)
      } catch (err) {
        alert('Failed to fetch game data')
      } finally {
        setLoading(false)
      }
    }
    fetchGame()
  }, [gameId, tournamentId])

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  // 1️⃣ Generate QR without saving booking
  const handleGenerateQR = async () => {
    if (!agreed) {
      alert('Please accept terms & conditions.')
      return
    }

    const { username, instaId, userId, rank } = formdata
    if (!username || !instaId || !userId || !rank) {
      alert('Fill all required fields before generating QR.')
      return
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/booking/book`, {
        username,
        instaId,
        userId,
        rank,
        gameId,
        tournamentId,
        gamerId: currentUser._id
      })

      setPaymentData(res.data.paymentInfo)
    } catch (err) {
      
      alert(err.response?.data?.message || 'Failed to generate QR')
    }
  
  }

  // 2️⃣ Verify payment & save booking
  const handleVerifyPayment = async () => {
    if (!transactionId) {
      alert('Enter the transaction ID to verify payment.')
      return
    }

    try {
      const payload = {
        username: formdata.username,
        instaId: formdata.instaId,
        userId: formdata.userId,
        rank: formdata.rank,
        gameId,
        tournamentId,
        gamerId: currentUser._id,
        transactionId
      }

      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/booking/verify-booking`, payload)
      alert('Payment will be verified verified! Booking saved.')
      setPaymentData(null)
      navigate(`/${tournamentId}/yourgames`)
    } catch (err) {
      alert(err.response?.data?.message || 'Payment verification failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-pink-500/30 rounded-full animate-spin animate-reverse border-t-pink-500"></div>
          </div>
          <p className="text-white text-lg sm:text-xl font-semibold mt-4 animate-pulse">Loading game...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-32 h-32 sm:w-40 sm:h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-3/4 left-1/3 w-20 h-20 sm:w-24 sm:h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating Gaming Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-4 sm:left-20 text-2xl sm:text-4xl animate-bounce animation-delay-500">🎮</div>
        <div className="absolute top-40 right-8 sm:right-32 text-xl sm:text-3xl animate-bounce animation-delay-1500">⚡</div>
        <div className="absolute bottom-32 left-8 sm:left-40 text-xl sm:text-3xl animate-bounce animation-delay-2500">💎</div>
        <div className="absolute bottom-20 right-4 sm:right-20 text-2xl sm:text-4xl animate-bounce animation-delay-3500">🏆</div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        {/* Back Button */}
        <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
          <button 
            onClick={() => navigate(`/${tournamentId}/yourgames`)}
            className="group flex items-center space-x-1 sm:space-x-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span className="hidden sm:inline">Back to Games</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-md mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="relative inline-block">
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                {gameName}
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg blur-lg"></div>
            </div>
            
            <div className="mt-3 sm:mt-4 inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
              </svg>
              <span className="text-green-400 font-bold text-base sm:text-lg">Entry Fee: ₹{amount}</span>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            <div className="space-y-4 sm:space-y-6">
              {/* Username Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-focus-within:text-purple-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username(Game-specific)" 
                  value={formdata.username} 
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300"
                />
              </div>

              {/* Instagram ID Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 group-focus-within:text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  name="instaId" 
                  placeholder="Instagram ID (For Shoutout , if you win)" 
                  value={formdata.instaId} 
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-400/50 transition-all duration-300"
                />
              </div>

              {/* User ID Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-focus-within:text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-0.257-0.257A6 6 0 1118 8zM2 8a6 6 0 1010.743 5.743L12 14l-0.257-0.257A6 6 0 012 8zm8-2a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <input 
                  type="text" 
                  name="userId" 
                  placeholder="User ID (Game-specific)" 
                  value={formdata.userId} 
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300"
                />
              </div>

              {/* Rank Select */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-focus-within:text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </div>
                <select 
                  name="rank" 
                  value={formdata.rank} 
                  onChange={handleChange}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400/50 transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-gray-800">Select Rank</option>
                  <option value="none" className="bg-gray-800">None</option>
                  <option value="bronze" className="bg-gray-800">🥉 Bronze</option>
                  <option value="silver" className="bg-gray-800">🥈 Silver</option>
                  <option value="gold" className="bg-gray-800">🥇 Gold</option>
                  <option value="platinum" className="bg-gray-800">💎 Platinum</option>
                  <option value="diamond" className="bg-gray-800">💍 Diamond</option>
                  <option value="crown" className="bg-gray-800">👑 Crown</option>
                  <option value="ace" className="bg-gray-800">♠️ Ace</option>
                  <option value="aceMaster" className="bg-gray-800">🎯 Ace Master</option>
                  <option value="aceDominator" className="bg-gray-800">⚡ Ace Dominator</option>
                  <option value="conqueror" className="bg-gray-800">🏆 Conqueror</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={agreed} 
                    onChange={e => setAgreed(e.target.checked)}
                    className="sr-only"
                    id="terms"
                  />
                  <label 
                    htmlFor="terms"
                    className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 border-2 rounded-md cursor-pointer transition-all duration-300 ${
                      agreed 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400' 
                        : 'border-white/30 hover:border-white/50'
                    }`}
                  >
                    {agreed && (
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </label>
                </div>
                <label onClick={tandcpage} htmlFor="terms" className="text-gray-300 text-sm sm:text-base cursor-pointer group-hover:text-white transition-colors duration-200">
                  I agree to Terms & Conditions
                </label>
              </div>

              {/* Generate QR Button */}
              <button 
                onClick={handleGenerateQR} 
                disabled={!agreed}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform ${
                  !agreed
                    ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                  </svg>
                  <span className="hidden sm:inline">Generate QR & Pay</span>
                  <span className="sm:hidden">Generate QR</span>
                </div>
              </button>
            </div>
          </div>

          {/* Payment QR Section */}
          {paymentData && (
            <div className="mt-6 sm:mt-8 bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl animate-slide-up">
              <div className="text-center">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd"/>
                    </svg>
                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      Scan QR to Pay
                    </span>
                  </h2>
                  <div className="w-12 h-1 sm:w-16 sm:h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
                </div>

                <div className="relative inline-block mb-4 sm:mb-6">
                  <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
                  <img 
                    src={paymentData.qrCode} 
                    alt="UPI QR Code" 
                    className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 rounded-xl sm:rounded-2xl border-4 border-white/20 shadow-2xl"
                  />
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 rounded-full p-1.5 sm:p-2 animate-pulse">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-300 text-sm sm:text-base mb-2">OR pay using link:</p>
                  <a 
                    href={paymentData.upiLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-dotted text-sm sm:text-base"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    <span>Open Payment Link</span>
                  </a>
                </div>

                {/* Transaction ID Input */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter Transaction ID" 
                      value={transactionId} 
                      onChange={e => setTransactionId(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-400/50 transition-all duration-300"
                    />
                  </div>

                  <button 
                    onClick={handleVerifyPayment}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="hidden sm:inline">Verify & Save Booking</span>
                      <span className="sm:hidden">Verify Payment</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style >{`
        @keyframes animate-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-reverse {
          animation: animate-reverse 1s linear infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1500 { animation-delay: 1.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animation-delay-3500 { animation-delay: 3.5s; }
      `}</style>
    </div>
  )
}

export default BookSlots