import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Home, Gamepad2, User, Trophy, CheckCircle, XCircle, Clock, IndianRupee } from 'lucide-react'
import assets from '../assets/assets'

const GamerBookings = () => {
    const [booking, setBooking] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const {gamerId} = useParams()
  const [bgImage, setBgImage] = useState(assets.l3) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m4) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l3) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l4) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
    useEffect(() => {
        const fetchBookings = async() => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/booking/your-bookings/${gamerId}`)
                setBooking(res.data.bookings)
            } catch (error) {
                setMessage(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [gamerId])

    const getPaymentIcon = (status) => {
        switch(status) {
            case 'Completed': return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            case 'Pending': return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            case 'Failed': return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
            default: return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        }
    }

    const getStatusColor = (status) => {
        switch(status) {
            case 'Completed': return 'text-green-400 bg-green-500/20'
            case 'Pending': return 'text-yellow-400 bg-yellow-500/20'
            case 'Failed': return 'text-red-400 bg-red-500/20'
            default: return 'text-gray-400 bg-gray-500/20'
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
                <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-bounce"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Background Image with Transparency */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            ></div>

            {/* Content Overlay */}
            <div className="relative z-10 p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 animate-fadeInDown space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <img src={assets.logo1} alt="" className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl" />
                       
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                                Your Gaming Sessions
                            </h1>
                            <p className="text-sm sm:text-base text-purple-200/70">Manage your bookings and track progress</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => navigate('/')}
                        className="group flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 backdrop-blur-sm rounded-xl border border-purple-400/30 text-white font-medium transition-all duration-300 hover:from-purple-500/90 hover:to-indigo-500/90 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 text-sm sm:text-base"
                    >
                        <Home className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Home</span>
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16 sm:py-20 animate-fadeIn">
                        <div className="relative">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-purple-300/30 border-t-purple-400 rounded-full animate-spin"></div>
                            <Gamepad2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-purple-400 animate-pulse" />
                        </div>
                        <p className="mt-4 text-purple-200 font-medium text-sm sm:text-base">Loading your epic sessions...</p>
                    </div>
                )}

                {/* Error Message */}
                {message && (
                    <div className="mb-6 p-3 sm:p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-300 animate-fadeIn">
                        <div className="flex items-center space-x-2">
                            <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-sm sm:text-base">{message}</span>
                        </div>
                    </div>
                )}

                {/* Bookings Grid */}
                {!loading && booking.length > 0 && (
                    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fadeInUp">
                        {booking.map((b, index) => (
              <div 
  key={b._id}
  className="group relative p-4 sm:p-6 bg-gradient-to-br from-purple-800/40 to-indigo-800/40 backdrop-blur-xl rounded-2xl border border-purple-400/30 hover:border-purple-300/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
  style={{
      animationDelay: `${index * 150}ms`
  }}
>
  {/* Card Glow Effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  <div className="relative z-10">
      {/* Game Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1.5 sm:p-2 bg-purple-600/30 rounded-lg">
                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
              </div>
              <div>
                  <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-purple-200 transition-colors duration-300">
                      {b.name}
                  </h3>
              </div>
          </div>
          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(b.paymentStatus)} flex items-center space-x-1`}>
              {getPaymentIcon(b.paymentStatus)}
              <span className="hidden sm:inline">{b.paymentStatus}</span>
              <span className="sm:hidden">{b.paymentStatus.slice(0, 4)}</span>
          </div>
      </div>

      {/* Player Info */}
      <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center space-x-2 sm:space-x-3 text-purple-200">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              <span className="text-xs sm:text-sm">{b.username}</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 text-purple-200">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-yellow-300">{b.rank}</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
              <IndianRupee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
              <span className="text-base sm:text-lg font-bold text-green-300">{b.amount}</span>
          </div>
     {/* 🔗 New Section for Link */}
          {b.link && (
              <div className="flex items-center space-x-2 sm:space-x-3 bg-green-500/20 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-green-400/30">
                  <a 
                    href={b.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-medium text-green-200 hover:text-green-100 underline transition-colors duration-300"
                  >
                    Whatsapp Group link
                  </a>
              </div>
          )}
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </div>
</div>

                        ))}
                    </div>
                )}

                {/* No Bookings State */}
                {!loading && booking.length === 0 && (
                    <div className="text-center py-16 sm:py-20 animate-fadeIn px-4">
                        <div className="mb-6">
                            <Gamepad2 className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-purple-300/50 animate-bounce" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-purple-200 mb-2">No Gaming Sessions Yet</h3>
                        <p className="text-sm sm:text-base text-purple-300/70 mb-6 max-w-md mx-auto">Start your gaming journey and book your first session!</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-medium hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base"
                        >
                            Explore Games
                        </button>
                    </div>
                )}
            </div>

            <style >{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeInDown {
                    from { 
                        opacity: 0; 
                        transform: translateY(-30px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }

                .animate-fadeInDown {
                    animation: fadeInDown 0.8s ease-out;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out both;
                }
            `}</style>
        </div>
    )
}

export default GamerBookings