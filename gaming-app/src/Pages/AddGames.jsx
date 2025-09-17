import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Home, Gamepad2, Clock, Calendar, DollarSign, Users, FileText, Image, Sparkles, Plus, Zap, Link } from 'lucide-react'
import assets from '../assets/assets'

const AddGames = () => {
    const {tournamentId} = useParams()
    const [message , setMessage]  = useState('')
    const [image , setImage] = useState(null)
    const navigate = useNavigate()
    const homePage = () => {
        navigate('/hostPage')
    }
    const [formdata , setFormdata] = useState({
          name: "",
    gameDescription: "",
    eligibility: "",
    Time: "",
    date: "",
    price: "",
    gameLive: "",
    link: ""
    })
      const [bgImage, setBgImage] = useState(assets.l4) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m2) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l2) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l4) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])

    const handleChange = (e) => {
        setFormdata({...formdata , [e.target.name] : e.target.value})
    }
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            Object.keys(formdata).forEach((key) => {
                data.append(key , formdata[key])
            })
            data.append('image' , image)

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/games/${tournamentId}/games`, data ,{headers: {'Content-Type' : 'multipart/form-data'}})

            setMessage(res.data.message)
            alert("Game Added Successfully")
            setFormdata({
                   name: "",
    gameDescription: "",
    eligibility: "",
    Time: "",
    date: "",
    price: "",
    gameLive: "",
    link: ""
            })
            setImage(null)
        } catch (error) {
            setMessage(error.message)
        }
    }
      const eligibilityOptions =   ['none' ,'bronze' , 'silver' ,'gold'  , 'platinum' , 'diamond'  , 'crown' , 'ace' , 'aceMaster' , 'aceDominator', 'conqueror'] 
 return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-900 to-fuchsia-900"
                style={{
                    backgroundImage: `url(${bgImage}`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                }}
            />
            
            {/* Animated Particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float"
                        style={{
                            left: `${20 + (i * 15)}%`,
                            top: `${10 + (i * 20)}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    {/* Home Button */}
                    <div className="mb-8 flex justify-start">
                        <button 
                            onClick={homePage}
                            className="group flex items-center space-x-2 px-6 py-3 bg-purple-900/40 backdrop-blur-lg border border-purple-400/30 hover:border-pink-400/50 rounded-2xl text-purple-200 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            <Home className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                            <span className="font-medium">Home</span>
                        </button>
                    </div>

                    {/* Form Container */}
                    <div className="bg-gradient-to-br from-purple-900/40 via-violet-900/40 to-fuchsia-900/40 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-8 shadow-2xl">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center space-x-3 mb-4">
                                <Gamepad2 className="w-10 h-10 text-fuchsia-400 animate-bounce" />
                                <h2 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    ADD GAME
                                </h2>
                                <Zap className="w-10 h-10 text-purple-400 animate-pulse" />
                            </div>
                            <p className="text-lg text-purple-200 font-light">
                                Create an epic gaming experience
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Game Name */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Gamepad2 className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Game Name"
                                    value={formdata.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40"
                                />
                            </div>

                            {/* Description */}
                            <div className="group relative">
                                <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                                    <FileText className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                </div>
                                <textarea
                                    name="gameDescription"
                                    placeholder="Game Description"
                                    value={formdata.gameDescription}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40 resize-none"
                                />
                            </div>

                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Eligibility */}
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Users className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                    </div>
                                    <select
                                        name="eligibility"
                                        value={formdata.eligibility}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40 appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-purple-900 text-purple-300">Select Eligibility</option>
                                        {eligibilityOptions.map((option) => (
                                            <option key={option} value={option} className="bg-purple-900 text-white">
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Time */}
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Clock className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="text"
                                        name="Time"
                                        placeholder="Time"
                                        value={formdata.Time}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40"
                                    />
                                </div>

                                {/* Date */}
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="text"
                                        name="date"
                                        placeholder="Date"
                                        value={formdata.date}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40"
                                    />
                                </div>
                                    {/* Date */}
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Link className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="text"
                                        name="link"
                                        placeholder="whatsapp link"
                                        value={formdata.link}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40"
                                    />
                                </div>

                                {/* Price */}
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <DollarSign className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                    </div>
                                    <input
                                        type="text"
                                        name="price"
                                        placeholder="Price"
                                        value={formdata.price}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40"
                                    />
                                </div>
                            </div>
                            

                            {/* Live Status Toggle */}
                            <div className="group relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Sparkles className="h-5 w-5 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300" />
                                </div>
                                <select
                                    name="gameLive"
                                    value={formdata.gameLive}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-4 bg-purple-800/30 backdrop-blur-lg border border-purple-400/30 focus:border-pink-400/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 hover:bg-purple-800/40 appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-purple-900 text-purple-200">Select Live Status</option>
                                    <option value="yes" className="bg-purple-900 text-green-300">✨ Yes - Go Live!</option>
                                    <option value="no" className="bg-purple-900 text-gray-300">⏸️ No - Keep Draft</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="group relative">
                                <label className="relative flex flex-col items-center justify-center w-full h-32 bg-purple-800/20 backdrop-blur-lg border-2 border-dashed border-purple-400/40 hover:border-pink-400/60 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-purple-800/30 group-hover:scale-[1.02]">
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <div className="p-3 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full backdrop-blur-sm border border-purple-400/20 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all duration-300">
                                            <Image className="w-8 h-8 text-purple-300 group-hover:text-pink-300 transition-colors duration-300" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-purple-200 group-hover:text-pink-200 transition-colors duration-300">
                                                {image ? image.name : "Upload Game Image"}
                                            </p>
                                            <p className="text-xs text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                                                Click or drag to upload
                                            </p>
                                        </div>
                                    </div>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept="image/*"
                                    />
                                    
                                    {/* Animated Border Effect */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                                    
                                    {/* Corner Sparkles */}
                                    <Sparkles className="absolute top-2 right-2 w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                                    <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                                </label>
                                
                                {/* Image Preview */}
                                {image && (
                                    <div className="mt-3 p-3 bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-lg border border-green-400/30 rounded-xl">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-green-300 font-medium">Image selected: {image.name}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="group w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 hover:from-purple-500 hover:via-pink-500 hover:to-fuchsia-500 text-white text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transform active:scale-95"
                                >
                                    <Plus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90" />
                                    <span>ADD EPIC GAME</span>
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                </button>
                            </div>
                        </form>

                        {/* Message Display */}
                        {message && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-2xl">
                                <p className="text-center text-purple-200 font-medium">{message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style >{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(120deg); }
                    66% { transform: translateY(10px) rotate(240deg); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default AddGames
