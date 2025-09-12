import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import assets from '../assets/assets'

const HostGames = () => {
  const [games, setGames] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { tournamentId } = useParams()
  const navigate = useNavigate()
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
   const yourbookings = (tournamentId , gameid) => {
    navigate(`/${tournamentId}/${gameid}/bookings`)
   }
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `http://localhost:5000/api/games/${tournamentId}/yourgames`
        )
        setGames(res.data.games)
      } catch (error) {
        console.error(error)
        setMessage('Failed to fetch games.')
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [tournamentId])

  const deleteGame = async (gameId) => {
    if (!window.confirm('Are you sure you want to delete this game?')) return
    try {
      await axios.delete(
        `http://localhost:5000/api/games/${tournamentId}/${gameId}/deletegame`
      )
      setGames(games.filter((game) => game._id !== gameId))
      setMessage('Game deleted successfully.')
    } catch (error) {
      console.error(error)
      setMessage('Failed to delete game.')
    }
  }

  const toggleLiveStatus = async (gameId, currentStatus) => {
    const newStatus = currentStatus === 'yes' ? 'no' : 'yes'
    try {
      const res = await axios.put(
        `http://localhost:5000/api/games/${tournamentId}/${gameId}/live`,
        { gameLive: newStatus }
      )
      setGames(
        games.map((game) =>
          game._id === gameId ? { ...game, gameLive: newStatus } : game
        )
      )
      setMessage(`Game live status updated to "${newStatus}".`)
    } catch (error) {
      console.error(error)
      setMessage('Failed to update live status.')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image (assets.bg2) */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 bg-black bg-opacity-40" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen">
        {/* Header with Logo and Navigation */}
        <div className="flex justify-between items-center p-6">
          {/* Logo on top left */}
          <div className="flex items-center space-x-4">
           <img 
  src={assets.logo} 
  alt="Logo" 
  className="w-16 h-16 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300 rounded-2xl"
/>

          </div>
          
          {/* Home Button */}
          <button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl backdrop-blur-sm border border-white/20"
          >
            🏠 Home
          </button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Host Games
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Loading & Messages */}
        <div className="text-center mb-8">
          {loading && (
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-8 py-4 text-white border border-white/30 shadow-2xl">
              <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
              <span className="font-medium text-lg">Loading epic games...</span>
            </div>
          )}
          {message && (
            <div className={`backdrop-blur-md text-white px-6 py-3 rounded-full inline-block border shadow-lg font-medium ${
              message.includes('successfully') || message.includes('updated') 
                ? 'bg-green-500/20 border-green-400/40' 
                : 'bg-red-500/20 border-red-400/40'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Games Grid */}
        <div className="px-6 pb-12">
          {games.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {games.map((game, index) => (
                <div 
                  key={game._id}
                  className="group relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {/* Glowing border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  
                  {/* Live Status Indicator */}
                  {game.gameLive === 'yes' && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="flex items-center space-x-2 bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-red-400/50">
                        <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </div>
                    </div>
                  )}

                  {/* Game Image */}
                  <div onClick={() =>yourbookings(tournamentId ,game._id)} className="relative h-48 overflow-hidden cursor-pointer">
                    <img 
                      src={game.image} 
                      alt={game.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Overlay icons */}
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      <div className="bg-black/40 backdrop-blur-sm rounded-full p-2">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Game Details */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300 line-clamp-1">
                        {game.name}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {game.description}
                    </p>

                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                      <span>{new Date(game.date).toLocaleDateString()}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-4">
                      <button
                        onClick={() => toggleLiveStatus(game._id, game.gameLive)}
                        className={`flex-1 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm border ${
                          game.gameLive === 'yes'
                            ? 'bg-orange-600/20 hover:bg-orange-600/40 text-orange-300 hover:text-white border-orange-600/30 hover:border-orange-600/60 hover:shadow-lg hover:shadow-orange-500/25'
                            : 'bg-green-600/20 hover:bg-green-600/40 text-green-300 hover:text-white border-green-600/30 hover:border-green-600/60 hover:shadow-lg hover:shadow-green-500/25'
                        }`}
                      >
                        {game.gameLive === 'yes' ? '📴 Set Offline' : '🔴 Go Live'}
                      </button>

                      <button
                        onClick={() => deleteGame(game._id)}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-white rounded-xl font-semibold text-sm transition-all duration-300 backdrop-blur-sm border border-red-600/30 hover:border-red-600/60 hover:shadow-lg hover:shadow-red-500/25"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Hover particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping animation-delay-300"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-16 border border-white/20 inline-block shadow-2xl">
                  <div className="text-8xl mb-6">🎮</div>
                  <h3 className="text-white text-2xl font-bold mb-3">No Games Found</h3>
                  <p className="text-gray-400 text-lg">Ready to create your first epic game?</p>
                  <div className="mt-6">
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Floating Gaming Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/6 w-4 h-4 bg-blue-400 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/6 w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-3000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default HostGames