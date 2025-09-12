import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Home, 
  Trophy, 
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
  IndianRupee as RupeeSign,
  Timer,
  Sparkles
} from 'lucide-react'
import assets from '../assets/assets'

const Games = () => {
    const [games ,setGames] = useState([])
    const [message , setMessage] = useState('')
    const [loading , setLoading] = useState(false)
    const {tournamentId} = useParams()
  const [bgImage, setBgImage] = useState(assets.l5) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m6) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l6) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l7) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
    const navigate = useNavigate()
 const bookslots = ( gameId) => {
  navigate(`/${tournamentId}/${gameId}/bookslots`)
 }
    useEffect(() => {
        const fetchGames = async() => {
            setLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${tournamentId}/yourgames` )
                setGames(res.data.games)
            } catch (error) {
                        console.error(error);
        setMessage('Failed to fetch games.');
            } finally{
                setLoading(false)
            }
        }
            fetchGames()
        
    } , [tournamentId])
   const floatingIcons = [Trophy, Gamepad2, Star, Crown, Target, Sword, Shield, Zap]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-indigo-900/15 to-black/30"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((Icon, index) => (
          <div
            key={index}
            className="absolute opacity-8 text-purple-300"
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
        {Array.from({ length: 25 }).map((_, index) => (
          <div
            key={`particle-${index}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.4}s`,
              animation: `sparkle 5s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Header Section */}
        <div className="relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-4 sm:pb-6">
            {/* Navigation with Logo */}
            <div className="flex justify-between items-center mb-8 sm:mb-12">
              <button 
                onClick={() => navigate('/tournaments')}
                className="group flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-purple-600/25 to-indigo-600/25 backdrop-blur-lg border border-purple-400/40 hover:border-purple-300/60 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200 group-hover:text-white transition-colors duration-300 group-hover:animate-pulse" />
                <span className="text-sm sm:text-base text-purple-100 group-hover:text-white font-semibold transition-colors duration-300">Home</span>
              </button>

              {/* GameHub Logo Section */}
              <div className="flex items-center space-x-2 sm:space-x-4 bg-gradient-to-r from-purple-800/30 via-indigo-800/25 to-purple-800/30 backdrop-blur-lg border border-purple-400/30 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl">
                <img src={assets.logo} className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 hover:rotate-12 hover:scale-110 cursor-pointer">
                </img>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">WE SPORTS</h3>
                  <p className="text-xs text-purple-200/80">Gaming Portal</p>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16 relative">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/25 to-pink-500/25 backdrop-blur-lg border border-purple-400/40 px-4 sm:px-6 py-2 rounded-full mb-4 sm:mb-6 shadow-lg">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-200 animate-spin" />
                <span className="text-purple-100 text-xs sm:text-sm font-medium">Tournament Games</span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-200 animate-spin" style={{ animationDelay: '0.5s' }} />
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-4 sm:mb-6">
                Elite Games
              </h1>
              <p className="text-base sm:text-xl text-purple-100/90 max-w-2xl mx-auto leading-relaxed px-4">
                Experience premium gaming competitions with professional-grade matches
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16 sm:py-20">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-purple-500/40 rounded-full animate-spin"></div>
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-14 h-14 sm:w-16 sm:h-16 border-4 border-t-purple-300 border-r-pink-300 border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300 animate-pulse" />
              </div>
              <p className="text-purple-200 text-center mt-4 sm:mt-6 font-medium text-sm sm:text-base">Loading games...</p>
            </div>
          </div>
        )}

        {/* Message Display */}
        {message && (
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/25 to-pink-600/25 backdrop-blur-lg border border-red-400/40 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-lg">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-red-300" />
              <span className="text-red-200 font-medium text-sm sm:text-base">{message}</span>
            </div>
          </div>
        )}

        {/* No Games Message */}
        {games.length === 0 && !loading && (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gray-600/25 to-gray-700/25 backdrop-blur-lg border border-gray-400/40 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
              <span className="text-gray-200 font-medium text-base sm:text-lg">No games found.</span>
            </div>
          </div>
        )}

        {/* Games Grid */}
        <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {games.map((game, index) => (
              <div 
                key={game._id}
                className="group relative overflow-hidden bg-gradient-to-br from-purple-900/35 via-indigo-900/25 to-purple-800/35 backdrop-blur-lg border border-purple-400/40 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-purple-400/30 transition-all duration-700 hover:scale-105 hover:border-purple-300/60"
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  animation: 'slideInUp 0.8s ease-out forwards'
                }}
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl blur-xl"></div>
                
                {/* Live Indicator */}
                {game.isLive && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 px-2 sm:px-3 py-1 rounded-full shadow-lg animate-pulse">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-ping"></div>
                    <span className="text-white text-xs font-bold">LIVE</span>
                  </div>
                )}

                {/* Game Image */}
                <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl h-40 sm:h-48 group-hover:h-36 sm:group-hover:h-44 transition-all duration-500">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Floating Game Icons */}
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 animate-bounce" />
                  </div>
                  <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {/* Game Name */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent group-hover:from-purple-100 group-hover:via-white group-hover:to-purple-100 transition-all duration-300 leading-tight">
                      {game.name}
                    </h3>
                    <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 group-hover:text-yellow-400 transition-colors duration-300 group-hover:animate-bounce" />
                  </div>

                  {/* Game Description */}
                  <p className="text-purple-100/80 group-hover:text-white/90 transition-colors duration-300 leading-relaxed text-xs sm:text-sm">
                    {game.gameDescription}
                  </p>

                  {/* Game Details Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 py-3 sm:py-4 border-t border-purple-400/20">
                    {/* Live Status */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${game.isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className={`text-xs sm:text-sm font-medium ${game.isLive ? 'text-green-200' : 'text-gray-300'}`}>
                        {game.isLive ? 'Live' : 'Scheduled'}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <RupeeSign className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 animate-pulse" />
                      <span className="text-purple-100 text-xs sm:text-sm font-semibold">{game.price}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />
                      <span className="text-purple-100/80 text-xs sm:text-sm">{game.date}</span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400 animate-pulse" />
                      <span className="text-purple-100/80 text-xs sm:text-sm">{game.Time}</span>
                    </div>
                  </div>

                  {/* Book Slots Button */}
                  <button onClick={() => bookslots(game._id)}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 group/btn border border-purple-400/30 hover:border-purple-300/50"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative flex items-center justify-center space-x-2">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:animate-pulse group-hover/btn:text-purple-100" />
                      <span className="group-hover/btn:text-purple-100 transition-colors duration-300">Book Slots</span>
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:animate-bounce group-hover/btn:text-yellow-300" />
                    </div>

                    {/* Bottom Glow Line */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 w-0 group-hover/btn:w-full transition-all duration-700 rounded-full"></div>
                  </button>
                </div>

                {/* Corner Decorative Elements */}
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-300 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div className="absolute top-2 right-10 sm:top-3 sm:right-12 opacity-0 group-hover:opacity-40 transition-opacity duration-500">
                  <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 animate-pulse" />
                </div>

                {/* Edge Glow Effects */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-500/0 via-purple-400/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-400/10 group-hover:to-indigo-500/20 transition-all duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.8; }
          50% { transform: translateY(-25px) rotate(180deg); opacity: 0.3; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
          25% { opacity: 1; transform: scale(1.5) rotate(90deg); }
          50% { opacity: 0.3; transform: scale(0.8) rotate(180deg); }
          75% { opacity: 1; transform: scale(1.2) rotate(270deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default Games