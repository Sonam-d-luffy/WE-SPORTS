import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Home, 
  Trophy, 
  Users, 
  Calendar, 
  Clock, 
  Gamepad2, 
  Star, 
  Zap, 
  Crown, 
  Target, 
  Sword, 
  Shield,
  Play,
  Eye,
  Award,
  MapPin,
  Timer,
  Sparkles
} from 'lucide-react'
import assets from '../assets/assets'

const Tournaments = () => {
        const [tournaments , setTournaments] = useState([])
    const [message , setMessage] = useState('')
    const [loading , setLoading] = useState(false)
      const [bgImage, setBgImage] = useState(assets.l1) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m1) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l1) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l1) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
    const navigate = useNavigate()
    const handleBookSlots = (tournamentId) => {
        navigate(`/${tournamentId}/yourgames`)
    }
    const homepage = () => {
      navigate('/')
    }
    const getTournaments = async(e) => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/games/allTournaments`)
            console.log("API URL:", process.env.REACT_APP_API_URL);
console.log("API URL:", process.env.REACT_APP_API_URL);

            setTournaments(res.data.alltournaments)
            setMessage(res.data.message)

        } catch (error) {
            setMessage(error.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getTournaments()
    },[])

  const floatingIcons = [Trophy, Gamepad2, Star, Crown, Target, Sword, Shield, Zap]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/40 to-black/60"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((Icon, index) => (
          <div
            key={index}
            className="absolute opacity-5 text-purple-300"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${index * 0.8}s`,
              animation: `float 12s ease-in-out infinite`,
              fontSize: `${30 + Math.random() * 40}px`
            }}
          >
            <Icon className="animate-pulse" />
          </div>
        ))}

        {/* Particle Effects */}
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={`particle-${index}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
              animation: `sparkle 6s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
            {/* Navigation */}
            <div className="flex justify-between items-center mb-8 sm:mb-12">
              <button 
                onClick={homepage}
                className="group flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-md border border-purple-500/30 hover:border-purple-400/50 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 group-hover:text-white transition-colors duration-300" />
                <span className="text-sm sm:text-base text-purple-200 group-hover:text-white font-medium transition-colors duration-300">Home</span>
              </button>

              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* GameHub Logo */}
                <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
                  <img src={assets.logo} className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  </img>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-white transition-all duration-300 group-hover:text-purple-200">WE SPORTS</h3>
                    <p className="text-xs text-purple-300 group-hover:text-purple-200 transition-colors duration-300">Gaming Portal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16 relative">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md border border-purple-500/30 px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300 animate-spin" />
                <span className="text-purple-200 text-xs sm:text-sm font-medium">Live Tournaments</span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300 animate-spin" style={{ animationDelay: '0.5s' }} />
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 sm:mb-6 animate-pulse">
                Elite Gaming
              </h1>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent mb-6 sm:mb-8">
                Tournaments
              </h2>
              <p className="text-base sm:text-xl text-purple-200/80 max-w-2xl mx-auto leading-relaxed px-4">
                Join the ultimate gaming experience with professional tournaments, 
                massive prize pools, and legendary competitions
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16 sm:py-20">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-600/30 rounded-full animate-spin"></div>
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-14 h-14 sm:w-16 sm:h-16 border-4 border-t-purple-400 border-r-pink-400 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Tournaments Grid */}
        <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {tournaments.map((tournament, index) => (
              <div 
                key={tournament._id}
                className="group relative overflow-hidden bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-purple-800/40 backdrop-blur-md border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 hover:scale-105 hover:border-purple-400/50"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl blur-xl"></div>
                
                {/* Live Indicator */}
                {tournament.live === 'yes' && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-red-500 to-pink-500 px-2 sm:px-3 py-1 rounded-full shadow-lg">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-white text-xs font-bold">LIVE</span>
                  </div>
                )}

                {/* Tournament Image */}
                <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl h-40 sm:h-48 group-hover:h-36 sm:group-hover:h-44 transition-all duration-500">
                  <img 
                    src={tournament.image} 
                    alt={tournament.gameName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Game Icons */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 animate-bounce" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Title */}
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:text-purple-100 transition-colors duration-300 leading-tight">
                      {tournament.gameName}
                    </h3>
                    <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-yellow-400 transition-colors duration-300 group-hover:animate-pulse" />
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-purple-200/80 group-hover:text-purple-100/90 transition-colors duration-300 leading-relaxed">
                    {tournament.description}
                  </p>

                  {/* Stats Row - Removed */}
                  
                  {/* Tournament Status */}
                  <div className="py-3 sm:py-4 border-t border-purple-500/20">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${tournament.live === 'yes' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className={`text-xs sm:text-sm font-medium ${tournament.live ==='yes' ? 'text-green-300' : 'text-gray-300'}`}>
                          {tournament.live === 'yes' ? 'Live Now' : 'Upcoming'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => handleBookSlots(tournament._id)}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 group/btn"
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    
                    <div className="relative flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:animate-pulse" />
                      <span>Book Slots</span>
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:animate-bounce" />
                    </div>
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 animate-ping" />
                </div>
              </div>
            ))}
          </div>

          {/* Message Display */}
          {message && (
            <div className="text-center mt-8 sm:mt-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-md border border-green-500/30 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <span className="text-sm sm:text-base text-green-200 font-medium">{message}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Tournaments