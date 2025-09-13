import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Play, Square, Edit3, Trash2, Plus, Gamepad2, Users, Sparkles, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'

//import assets from '../assets/assets'

const HostTournaments = () => {
    const [tournaments , setTournaments] = useState([])
    const [message , setMessage] = useState('')
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
      const [bgImage, setBgImage] = useState(assets.l7) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m1) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l4) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l7) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
    const addGamesPage = (id) => {
        navigate(`/${id}/uploadGames`)
    }
     const hostgames = (id) => {
        navigate(`/${id}/hostGames`)
    }
    const hostpage = () => {
      navigate('/hostPage')
    }
    const getTournaments = async(e) => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/games/allTournaments`)
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
      const toggleLive = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "yes" ? "no" : "yes";

      await axios.put(`${import.meta.env.VITE_API_URL}/api/games/${id}/live`, {
        live: newStatus,
      });

      // Update state instantly (optimistic UI update)
      setTournaments((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, live: newStatus } : t
        )
      );
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update live status.');
    }
  };
const deleteTournament = async (id) => {
  const confirmDelete = window.confirm("Do you want to delete it?");
  if (!confirmDelete) return;

  // Optimistically remove from UI
  setTournaments((prev) => prev.filter((t) => t._id !== id));

  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/games/${id}/delete`);
    setMessage("Tournament deleted successfully");
  } catch (error) {
    setMessage(error.response?.data?.message || error.message);
    // Rollback if delete failed
    setTournaments((prev) => [...prev, tournaments.find((t) => t._id === id)]);
  }
};

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-900 to-fuchsia-900"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-8">
        {/* Back Button */}
        <div className="mb-6">
          <button onClick={hostpage} className="group flex items-center space-x-2 px-4 py-2 bg-purple-900/40 backdrop-blur-lg border border-purple-400/30 hover:border-pink-400/50 rounded-xl text-purple-200 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center space-x-3 mb-6">
            <Gamepad2 className="w-12 h-12 text-fuchsia-400 animate-bounce" />
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              TOURNAMENTS
            </h1>
            <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
          </div>
          <p className="text-xl text-purple-200 font-light tracking-wide">
            Manage your epic gaming tournaments
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-pink-400 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="ml-4 text-purple-200 text-xl font-semibold">Loading tournaments...</p>
          </div>
        )}

        {/* Message */}
        {message && (
          <div className="text-center mb-8">
            <p className="inline-block px-6 py-3 bg-purple-500/20 backdrop-blur-lg rounded-full text-purple-200 border border-purple-400/30">
              {message}
            </p>
          </div>
        )}

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.length > 0 ? (
            tournaments.map((t, index) => (
              <div
                key={t._id || index}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-fuchsia-900/40 backdrop-blur-xl border border-purple-400/30 hover:border-pink-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Card Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Tournament Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent" />
                  
                  {/* Live Status Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                      t.live === 'yes' 
                        ? 'bg-green-500/20 text-green-300 border-green-400/50 animate-pulse' 
                        : 'bg-gray-500/20 text-gray-300 border-gray-400/50'
                    }`}>
                      {t.live === 'yes' ? (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span>LIVE</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <Square className="w-3 h-3" />
                          <span>OFFLINE</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
                      {t.name}
                    </h3>
                    <p className="text-purple-200 text-sm leading-relaxed opacity-90">
                      {t.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    <button onClick={() =>addGamesPage(t._id)} className="flex-1 min-w-0 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5">
                      <Plus className="w-4 h-4" />
                      <span className="text-xs">Add Slots</span>
                    </button>
                    
                    <button
                      onClick={() => toggleLive(t._id, t.live)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 ${
                        t.live === 'yes'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white hover:shadow-green-500/25'
                          : 'bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-500 hover:to-slate-500 text-white hover:shadow-gray-500/25'
                      }`}
                    >
                      {t.live === 'yes' ? (
                        <Play className="w-4 h-4" fill="currentColor" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    
                    <button onClick={() => hostgames(t._id)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    
                    <button onClick={() => deleteTournament(t._id)} className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 transform hover:-translate-y-0.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-pink-400/5 to-fuchsia-400/5 rounded-3xl" />
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="text-center space-y-4">
                  <Users className="w-24 h-24 text-purple-400 mx-auto opacity-50" />
                  <h3 className="text-2xl font-bold text-purple-300">No Tournaments Available</h3>
                  <p className="text-purple-400 max-w-md">
                    Create your first tournament to get started with epic gaming battles!
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <style >{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  )
}

export default HostTournaments

