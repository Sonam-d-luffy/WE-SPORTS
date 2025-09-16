import React, { useEffect, useState } from 'react'
import axios from 'axios'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hosts = () => {
  const [hosts, setHosts] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [bgImage, setBgImage] = useState(assets.l9) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m10) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l1) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l9) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
  useEffect(() => {
    const fetchHosts = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/host-auth/allhosts`)
        setHosts(res.data.hosts)
      } catch (error) {
        setMessage('Error fetching hosts')
      } finally {
        setLoading(false)
      }
    }
    fetchHosts()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* First Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Logo Background with Opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${assets.logo})` }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
     {/* Header with Logo + Home Button */}
<div className="flex justify-between items-center p-6">
  {/* Logo on left */}
  <img 
    src={assets.logo1} 
    alt="Logo" 
       className="
      h-14 w-auto object-contain drop-shadow-lg 
      rounded-xl border-2 border-white/30
      transform transition-transform duration-500 ease-in-out
      hover:rotate-6 hover:scale-105
    "
  />

  {/* Home button on right */}
  <button 
    onClick={() => navigate('/')}
    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl backdrop-blur-sm border border-white/20"
  >
    ← Home
  </button>
</div>


        {/* Main Leads Section - Enhanced Design */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white mb-16 tracking-wider">
          🌟 MAIN LEADS
        </h2>
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-20 px-4 md:px-8">
          {/* Side Lead 1 */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
            <div className="relative overflow-hidden rounded-2xl border-4 border-white/30 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-purple-500/50 group-hover:border-purple-400/60">
              <img 
                src={assets.h1} 
                alt="Main Lead 1" 
                className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-sm text-purple-200">MANAGER</p>
              </div>
            </div>
          </div>
          
          {/* Center Main Lead */}
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-700 animate-pulse"></div>
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/40 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-pink-500/60 group-hover:border-pink-400/70">
              <img 
                src={assets.h3} 
                alt="Main Lead 2" 
                className="w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96 object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Crown effect for center image */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a1 1 0 00-.894 1.447l2.5 5A1 1 0 007.5 11h5a1 1 0 00.894-.553l2.5-5A1 1 0 0015 4H5zM3 13v-1a1 1 0 011-1h12a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1z"/>
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold mb-2">Host</h3>
                <p className="text-lg text-pink-200">Star Creator</p>
                <div className="flex justify-center mt-3">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                    👑 FEATURED
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Lead 3 */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 animate-pulse"></div>
            <div className="relative overflow-hidden rounded-2xl border-4 border-white/30 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-blue-500/50 group-hover:border-blue-400/60">
              <img 
                src={assets.h2} 
                alt="Main Lead 3" 
                className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 object-cover transition-all duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-sm text-blue-200">Behind The Scene</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading & Messages */}
        <div className="text-center mb-12">
          {loading && (
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-8 py-4 text-white border border-white/30">
              <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
              <span className="font-medium text-lg">Loading amazing hosts...</span>
            </div>
          )}
          {message && (
            <div className="bg-red-500/20 backdrop-blur-md text-white px-8 py-4 rounded-full inline-block border border-red-400/40 shadow-lg">
              <p className="font-medium">{message}</p>
            </div>
          )}
        </div>

        {/* Hosts Grid */}
        <div className="px-6 pb-12">
          {hosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {hosts.map((host, index) => (
                <div 
                  key={host._id}
                  className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:border-white/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Floating glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  
                  {/* Host Image */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-all duration-300"></div>
                      <img 
                        src={host.image} 
                        alt={host.name}
                        className="relative w-24 h-24 rounded-full object-cover border-3 border-white shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110"
                      />
                      {/* Online status indicator */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                  </div>

                  {/* Host Details */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                      {host.name}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium opacity-80">
                      {host.email}
                    </p>
                      <p className="text-gray-300 text-sm font-medium opacity-80">
                      {host.role}
                    </p>
                    <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {host.description}
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 mt-6 pt-4 border-t border-white/10">
                    {host.links?.youtube && (
                      <a 
                        href={host.links.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/btn bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 backdrop-blur-sm border border-red-600/30 hover:border-red-600/60 hover:shadow-lg hover:shadow-red-500/25"
                      >
                        <span className="group-hover/btn:animate-bounce">▶</span> YouTube
                      </a>
                    )}
                    {host.links?.instagram && (
                      <a 
                        href={host.links.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group/btn bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 text-purple-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 backdrop-blur-sm border border-purple-600/30 hover:border-purple-600/60 hover:shadow-lg hover:shadow-purple-500/25"
                      >
                        <span className="group-hover/btn:animate-spin">📸</span> Instagram
                      </a>
                    )}
                  </div>

                  {/* Hover particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full animate-ping animation-delay-300"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 inline-block shadow-2xl">
                  <div className="text-6xl mb-4">🎭</div>
                  <p className="text-white text-xl font-bold mb-2">No hosts found</p>
                  <p className="text-gray-400">Check back later for amazing content creators!</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-30 animate-bounce animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-pink-400 rounded-full opacity-40 animate-bounce animation-delay-2000"></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-bounce animation-delay-3000"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full opacity-50 animate-ping"></div>
      </div>

      {/* Custom CSS for animations */}
      <style >{`
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
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  )
}

export default Hosts