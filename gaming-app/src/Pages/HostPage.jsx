import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Home, Upload, Eye, Crown, Sparkles, Zap, GamepadIcon, ArrowRight } from 'lucide-react'

const HostPage = () => {
  const navigate = useNavigate()
  
  const homePage = () => {
    navigate('/')
  }
  
  const uploadTournaments = () => {
    navigate("/uploadTournament")
  }
  
  const viewTournaments = () => {
    navigate('/hostTournament')
  }
  const [bgImage, setBgImage] = useState(assets.l1) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m8) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l10) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l11) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-violet-900/70 to-fuchsia-900/80"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-fuchsia-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-40 h-40 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-full blur-2xl animate-float"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${5 + (i * 15)}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center p-8">
          {/* Home Button */}
          <button 
            onClick={homePage}
            className="group flex items-center space-x-3 px-6 py-3 bg-purple-900/50 backdrop-blur-xl border border-purple-400/30 hover:border-fuchsia-400/60 rounded-2xl text-purple-200 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <Home className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
            <span className="font-semibold">Home</span>
          </button>

          {/* Crown Icon */}
          <div className="p-4 bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30 backdrop-blur-xl border border-purple-400/20 rounded-full">
            <Crown className="w-8 h-8 text-fuchsia-400 animate-pulse" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-4xl">
            {/* Title Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center space-x-4 mb-6">
                <GamepadIcon className="w-12 h-12 text-purple-400 animate-bounce" />
                <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  HOST CENTER
                </h1>
                <Zap className="w-12 h-12 text-fuchsia-400 animate-pulse" />
              </div>
              
              <p className="text-2xl text-purple-200 font-light mb-4">
                Manage from here
              </p>
              
              <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full mx-auto"></div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Upload Tournaments Card */}
              <div 
                onClick={uploadTournaments}
                className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 backdrop-blur-xl border border-purple-400/30 group-hover:border-fuchsia-400/60 rounded-3xl transition-all duration-300"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-fuchsia-500/10 to-purple-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                <div className="relative p-8 text-center">
                  {/* Icon Container */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600/40 to-fuchsia-600/40 backdrop-blur-lg border border-purple-400/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-10 h-10 text-fuchsia-400 group-hover:text-pink-300 transition-colors duration-300" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-fuchsia-200 transition-colors duration-300">
                    Upload Tournaments
                  </h3>
                  
                  <p className="text-purple-300 group-hover:text-purple-200 transition-colors duration-300 mb-4">
                    Create and launch new gaming tournaments
                  </p>
                  
                  {/* Action Arrow */}
                  <div className="flex items-center justify-center space-x-2 text-fuchsia-400 group-hover:text-pink-300 transition-all duration-300 group-hover:translate-x-2">
                    <span className="font-semibold">Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  
                  {/* Floating Sparkles */}
                  <Sparkles className="absolute top-4 right-4 w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                  <Sparkles className="absolute bottom-4 left-4 w-3 h-3 text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>

              {/* View Tournaments Card */}
              <div 
                onClick={viewTournaments}
                className="group relative cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 backdrop-blur-xl border border-fuchsia-400/30 group-hover:border-purple-400/60 rounded-3xl transition-all duration-300"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 via-purple-500/10 to-fuchsia-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                <div className="relative p-8 text-center">
                  {/* Icon Container */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-fuchsia-600/40 to-purple-600/40 backdrop-blur-lg border border-fuchsia-400/30 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-10 h-10 text-purple-400 group-hover:text-fuchsia-300 transition-colors duration-300" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                    View Your Tournaments
                  </h3>
                  
                  <p className="text-fuchsia-300 group-hover:text-fuchsia-200 transition-colors duration-300 mb-4">
                    Manage and monitor existing tournaments
                  </p>
                  
                  {/* Action Arrow */}
                  <div className="flex items-center justify-center space-x-2 text-purple-400 group-hover:text-fuchsia-300 transition-all duration-300 group-hover:translate-x-2">
                    <span className="font-semibold">View All</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  
                  {/* Floating Sparkles */}
                  <Sparkles className="absolute top-4 right-4 w-4 h-4 text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                  <Sparkles className="absolute bottom-4 left-4 w-3 h-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="relative z-10 p-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2 px-6 py-3 bg-purple-900/30 backdrop-blur-lg border border-purple-400/20 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-purple-300 text-sm font-medium">Tournament Management Hub</span>
              <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(15px) rotate(240deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default HostPage