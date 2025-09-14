import React, { useContext, useState } from 'react'
import { User, Gamepad2, Crown, X, ChevronRight, Zap, Trophy, Target, Sword, Shield, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { UserContext } from '../Pages/UserContext'

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const {currentUser, logout} = useContext(UserContext)
      const bookings = ( gamerId) => {
    navigate(`/${gamerId}/bookings`)
   }

  const hostLoginPage = () => navigate('/hostLogin')
  const gamerLoginPage = () => navigate('/gamerLogin')
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const gameIcons = [
    { Icon: Gamepad2, delay: '0s' },
    { Icon: Trophy, delay: '0.5s' },
    { Icon: Target, delay: '1s' },
    { Icon: Sword, delay: '1.5s' },
    { Icon: Shield, delay: '2s' },
    { Icon: Star, delay: '2.5s' },
    { Icon: Zap, delay: '3s' },
  ]

  return (
    <>
      {/* Top Navbar - Made Transparent */}
      <div className="flex justify-center px-4 py-6 z-30 relative">
        <div className="bg-purple-100/20 backdrop-blur-md border border-purple-200/20 rounded-3xl px-8 py-4 shadow-lg max-w-4xl w-full flex items-center justify-between relative overflow-hidden">
          {/* Logo */}
          <div className="flex items-center space-x-4 group cursor-pointer relative z-10">
            <img src={assets.logo} className="w-16 h-16 bg-gradient-to-br from-purple-200/60 via-purple-300/60 to-purple-400/60 rounded-2xl flex items-center justify-center shadow-md transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
            </img>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold text-purple-100 transition-all duration-300 group-hover:text-white drop-shadow-lg">WE SPORTS</h1>
              <p className="text-xs text-purple-200 group-hover:text-purple-100 transition-colors duration-300 drop-shadow-md">Gaming Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
       <div className="hidden md:flex items-center">
  <button onClick={() => bookings(currentUser?._id)}
    className="bg-purple-200/30 hover:bg-purple-300/40 text-purple-100 hover:text-white px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md transform hover:scale-105 backdrop-blur-sm border border-purple-300/20 drop-shadow-lg"
  >
    <span>YOUR BOOKINGS</span>
    <span>📝</span>
  </button>
</div>

          {/* Login Button */}
          <button
            onClick={toggleSidebar}
            className="bg-purple-200/30 hover:bg-purple-300/40 text-purple-100 hover:text-white px-6 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md transform hover:scale-105 backdrop-blur-sm border border-purple-300/20 drop-shadow-lg"
          >
            <User className="w-4 h-4" />
            {currentUser ? currentUser.name.split(" ")[0] : "Login"}
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed top-0 right-0 h-screen w-96 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 z-50 shadow-2xl border-l border-purple-700/30 overflow-y-auto transform transition-transform duration-300">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {gameIcons.map(({ Icon, delay }, index) => (
              <div
                key={index}
                className="absolute opacity-5 text-purple-300"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${10 + Math.random() * 80}%`,
                  animationDelay: delay,
                  animation: `float 8s ease-in-out infinite`,
                  fontSize: `${25 + Math.random() * 25}px`
                }}
              >
                <Icon className="animate-pulse" />
              </div>
            ))}
            
            {/* Additional Floating Icons */}
            {[Crown, Sword, Shield, Star, Trophy].map((Icon, index) => (
              <div
                key={`extra-${index}`}
                className="absolute opacity-3 text-indigo-400"
                style={{
                  top: `${15 + Math.random() * 70}%`,
                  left: `${15 + Math.random() * 70}%`,
                  animationDelay: `${index * 0.8}s`,
                  animation: `float 10s ease-in-out infinite reverse`,
                  fontSize: `${15 + Math.random() * 15}px`
                }}
              >
                <Icon className="animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            ))}

            {/* Particle Effects */}
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`particle-${index}`}
                className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${index * 0.3}s`,
                  animation: `sparkle 4s ease-in-out infinite`
                }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-700/30 backdrop-blur-sm relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center animate-pulse">
                <Crown className="w-5 h-5 text-white animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                Choose Login Type
              </h2>
            </div>
            <button
              onClick={toggleSidebar}
              className="text-purple-300 hover:text-white transition-all duration-300 p-2 hover:bg-purple-700/30 rounded-xl transform hover:rotate-90 hover:scale-110"
            >
              <X className="w-6 h-6 animate-pulse" />
            </button>
          </div>

          {/* Login Options */}
          <div className="p-6 space-y-6 relative z-10">
            {/* Host Login Button */}
            <div className="group">
              <button 
                onClick={hostLoginPage} 
                className="w-full relative overflow-hidden bg-gradient-to-r from-purple-700/40 via-purple-600/40 to-purple-700/40 hover:from-purple-600/60 hover:via-purple-500/60 hover:to-purple-600/60 text-white p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-purple-500/30 hover:border-purple-400/50"
              >
                {/* Multiple Animated Background Glows */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl animate-pulse"></div>
                
                {/* Floating Mini Icons */}
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Crown className="w-4 h-4 text-purple-300 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div className="absolute bottom-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Trophy className="w-3 h-3 text-pink-300 animate-bounce" style={{ animationDelay: '1s' }} />
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:rotate-12">
                      <Crown className="w-6 h-6 text-white group-hover:animate-pulse group-hover:drop-shadow-lg" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-100 transition-colors duration-300">Host Login</h3>
                      <p className="text-sm text-purple-200 group-hover:text-purple-100 transition-colors duration-300">Organize tournaments</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-spin" style={{ animationDuration: '3s' }} />
                    <ChevronRight className="w-6 h-6 text-purple-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 group-hover:drop-shadow-lg" />
                  </div>
                </div>

                {/* Animated Progress Bars */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-pink-300 to-purple-300 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ transitionDelay: '0.2s' }}></div>
              </button>
            </div>

            {/* Gamer Login Button */}
            <div className="group">
              <button 
                onClick={gamerLoginPage} 
                className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-700/40 via-blue-600/40 to-indigo-700/40 hover:from-indigo-600/60 hover:via-blue-500/60 hover:to-indigo-600/60 text-white p-6 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-indigo-500/30 hover:border-indigo-400/50"
              >
                {/* Multiple Animated Background Glows */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-indigo-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl animate-pulse"></div>
                
                {/* Floating Mini Icons */}
                <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Gamepad2 className="w-4 h-4 text-indigo-300 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
                <div className="absolute bottom-2 left-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  <Target className="w-3 h-3 text-blue-300 animate-ping" style={{ animationDelay: '1.5s' }} />
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:-rotate-12">
                      <Gamepad2 className="w-6 h-6 text-white group-hover:animate-bounce group-hover:drop-shadow-lg" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-100 transition-colors duration-300">Gamer Login</h3>
                      <p className="text-sm text-indigo-200 group-hover:text-indigo-100 transition-colors duration-300">Join competitions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                    <ChevronRight className="w-6 h-6 text-indigo-300 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 group-hover:drop-shadow-lg" />
                  </div>
                </div>

                {/* Animated Progress Bars */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-400 to-blue-400 w-0 group-hover:w-full transition-all duration-500 rounded-full"></div>
                <div className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 w-0 group-hover:w-full transition-all duration-700 rounded-full" style={{ transitionDelay: '0.2s' }}></div>
              </button>
            </div>
      {currentUser && (
  <>
    {/* Logout button first */}
    <button
      onClick={logout}
      className="bg-gradient-to-r from-purple-200/90 to-purple-300/90 hover:from-purple-300 hover:to-purple-400 
                 text-purple-800 hover:text-purple-900 px-6 py-2.5 rounded-2xl font-semibold text-sm 
                 transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md 
                 transform hover:scale-105"
    >
      <User className="w-4 h-4" />
      <span>Logout</span>
    </button>

    {/* Bookings button second */}
    <button
      onClick={() => bookings(currentUser._id)}
      className="bg-gradient-to-r from-purple-200/90 to-purple-300/90 hover:from-purple-300 hover:to-purple-400 
                 text-purple-800 hover:text-purple-900 px-6 py-2.5 rounded-2xl font-semibold text-sm 
                 transition-all duration-300 flex items-center space-x-2 shadow-sm hover:shadow-md 
                 transform hover:scale-105"
    >
      <User className="w-4 h-4" />
      <span>Bookings</span>
    </button>
  </>
)}

           

            {/* Enhanced Decorative Elements */}
            <div className="flex justify-center space-x-4 pt-4">
              {[Zap, Trophy, Target].map((Icon, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 rounded-lg flex items-center justify-center transform hover:scale-125 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Icon className="w-4 h-4 text-purple-300 animate-pulse hover:animate-bounce" />
                </div>
              ))}
            </div>

            {/* Additional Decorative Row */}
            <div className="flex justify-center space-x-3 opacity-60">
              {[Sword, Shield, Star, Crown].map((Icon, index) => (
                <div
                  key={`deco-${index}`}
                  className="w-6 h-6 text-purple-400/50 animate-pulse"
                  style={{ 
                    animationDelay: `${index * 0.4}s`,
                    animation: `float 5s ease-in-out infinite`
                  }}
                >
                  <Icon className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Bottom Section */}
          <div className="absolute bottom-0 left-0 right-0">
            
            {/* Animated Gradient Bars */}
            <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-50 animate-pulse"></div>
            <div className="h-0.5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-30" style={{ animation: 'shimmer 3s ease-in-out infinite' }}></div>
          </div>

          {/* Floating Corner Icons */}
          <div className="absolute top-20 left-4 opacity-10">
            <Trophy className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '12s' }} />
          </div>
          <div className="absolute bottom-20 right-4 opacity-10">
            <Star className="w-5 h-5 text-purple-300 animate-ping" style={{ animationDelay: '2s' }} />
          </div>
        </div>
      )}

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  )
}

export default Navbar