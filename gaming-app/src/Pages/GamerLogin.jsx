import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import assets from '../assets/assets'
import { Eye, EyeOff, User, Mail, Lock, Phone, MapPin, Upload, Home, Gamepad2, Zap, Star } from 'lucide-react'
import { UserContext } from './UserContext'
const GamerLogin = () => {
      const [isLogin , setIsLogin] = useState(false)
    const [message , setMessage] = useState('')
    const [user , setUser] = useState(null)
      const [showPassword, setShowPassword] = useState(false)
    const [loading , setLoading] = useState(false)
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const navigate = useNavigate()
      const [bgImage, setBgImage] = useState(assets.l7) // default desktop

useEffect(() => {
  const updateBackground = () => {
    if (window.innerWidth < 640) {
      setBgImage(assets.m3) // 👈 small screens (mobile)
    } else if (window.innerWidth < 1024) {
      setBgImage(assets.l3) // 👈 medium screens (tablet)
    } else {
      setBgImage(assets.l7) // 👈 large screens (desktop)
    }
  }

  updateBackground()
  window.addEventListener("resize", updateBackground)
  return () => window.removeEventListener("resize", updateBackground)
}, [])
    const homePage = () => {
      navigate('/')
    }
    const [formData , setFormData] = useState({
        name: '' , email: '' , password: ''  , state: '' , district: '' , local : '',image: '', pincode: '' , phone: ''
    })
    const toggle = () => {
         setIsLogin((prev) => !prev)
  
    }
    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }
   

      // Fetch state & district using pincode
  const handlePincodeBlur = async () => {
    if (formData.pincode.length === 6) {
      try {
        const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/pincode/${formData.pincode}`
        );
        const data = res.data[0];
        if (data.Status === "Success") {
          setFormData((prev) => ({
            ...prev,
            state: data.PostOffice[0].State,
            district: data.PostOffice[0].District,
          }));
        }
      } catch (error) {
        setMessage('Error fetching location data , invalid pincode');
      }
    }
  };

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if(isLogin){
                const {email , password } = formData
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/gamer-auth/login` , {email , password})
                         setMessage(res.data.message)
// Example in your Signup.jsx after successful signup
    //  setMessage(res.data.message)

    //  if (res.data.redirect === 'otp') {
        // email not verified → redirect to OTP
      //  navigate('/otp-verify', { state: { gamerId: res.data.userId } })
    //  } else {
        // verified user → normal login
        setCurrentUser(res.data.user)
        localStorage.setItem("token", res.data.token)
        navigate('/')
    //  }
                           
            } else {
                const form = new FormData()
                Object.keys(formData).forEach((key) => {
                    
      form.append(key, formData[key]);
    
                })
                
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/gamer-auth/signup` , form ,{
                headers: {'Content-Type' : 'application/json'}
            })
                  // redirect to OTP page instead of home
            //setUser(res.data.user)
            //setCurrentUser(res.data.user)
            //alert(res.data.message)
            setMessage(res.data.message)
// Example in your Signup.jsx after successful signup
//navigate('/otp-verify', { state: { gamerId: res.data.userId } });


            setFormData({
             name: '' , email: '' , password: ''  , state: '' , district: '' , local : '',image: '', pincode: '' , phone: ''
            })
            }
           navigate('/')
        } catch (error) {
  setMessage(error.response?.data?.message || error.message)
        }finally{
          setLoading(false)
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Your Gaming Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                        backgroundImage: `url(${bgImage})`
// Replace with your assets.game path
                }}
            >
                {/* Transparent Dark Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Translucent Gaming Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/20 via-transparent to-purple-900/20"></div>
                
                {/* Animated Particles */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-fuchsia-400 rounded-full opacity-40 animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Home Button */}
            <button
                onClick={homePage}
                className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md border border-fuchsia-500/20 rounded-full text-white hover:bg-black/30 hover:border-fuchsia-400/40 transition-all duration-300 group"
            >
                <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">HOME</span>
            </button>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-lg">
                    {/* Gaming Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="relative">
                                <Gamepad2 className="w-12 h-12 text-fuchsia-400 animate-pulse" />
                                <div className="absolute inset-0 w-12 h-12 bg-fuchsia-400/20 rounded-full animate-ping"></div>
                            </div>
                            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 drop-shadow-lg animate-pulse">
                                GAMEVERSE
                            </h1>
                            <div className="relative">
                                <Star className="w-8 h-8 text-yellow-400 animate-spin" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Zap className="w-5 h-5 text-fuchsia-400" />
                            <p className="text-xl text-white/90 font-bold tracking-wider">
                                {isLogin ? "WELCOME BACK, GAMER!" : "JOIN THE REVOLUTION"}
                            </p>
                            <Zap className="w-5 h-5 text-fuchsia-400" />
                        </div>
                        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent mx-auto"></div>
                    </div>

                    {/* Login/Signup Card */}
                    <div className="backdrop-blur-xl bg-white/5 border-2 border-fuchsia-500/20 rounded-3xl p-8 shadow-2xl hover:shadow-fuchsia-500/15 transition-all duration-500 hover:scale-105 group">
                        {/* Card Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-black text-white mb-3 tracking-wide">
                                {isLogin ? "⚡ PLAYER LOGIN ⚡" : "🚀 CREATE ACCOUNT 🚀"}
                            </h2>
                            <div className="relative">
                                <div className="h-1 w-24 bg-gradient-to-r from-fuchsia-500 to-pink-500 mx-auto rounded-full"></div>
                                <div className="absolute inset-0 h-1 w-24 bg-gradient-to-r from-fuchsia-500 to-pink-500 mx-auto rounded-full blur-sm opacity-70"></div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="space-y-5">
                            {!isLogin && (
                                <>
                                    {/* Name Input */}
                                    <div className="relative group">
                                        <User className="absolute left-4 top-4 h-5 w-5 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors z-10" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Name"
                                            className="w-full pl-12 pr-4 py-4 bg-black/20 border-2 border-white/10 rounded-xl text-white placeholder-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 font-semibold hover:bg-black/30 hover:border-fuchsia-400/30 backdrop-blur-sm"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>

                                    {/* Local Area Input */}
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-4 h-5 w-5 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors z-10" />
                                        <input
                                            type="text"
                                            name="local"
                                            value={formData.local}
                                            onChange={handleChange}
                                            placeholder="Local (e.g., kashipur)"
                                            className="w-full pl-12 pr-4 py-4 bg-black/20 border-2 border-white/10 rounded-xl text-white placeholder-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 font-semibold hover:bg-black/30 hover:border-fuchsia-400/30 backdrop-blur-sm"
                                        />
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                    </div>

                                    {/* Pincode & Phone Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                onBlur={handlePincodeBlur}
                                                placeholder="Pincode(type manually)"
                                                className="w-full px-4 py-4 bg-black/20 border-2 border-white/10 rounded-xl text-white placeholder-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 font-semibold hover:bg-black/30 hover:border-fuchsia-400/30 backdrop-blur-sm"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-3 top-4 h-5 w-5 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors z-10" />
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Phone"
                                                className="w-full pl-11 pr-4 py-4 bg-black/20 border-2 border-white/10 rounded-xl text-white placeholder-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 font-semibold hover:bg-black/30 hover:border-fuchsia-400/30 backdrop-blur-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* State & District Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                placeholder="State"
                                                readOnly
                                                className="w-full px-4 py-4 bg-black/10 border-2 border-gray-600/30 rounded-xl text-gray-300 placeholder-gray-500 font-semibold cursor-not-allowed backdrop-blur-sm"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="district"
                                                value={formData.district}
                                                onChange={handleChange}
                                                placeholder="District"
                                                readOnly
                                                className="w-full px-4 py-4 bg-black/10 border-2 border-gray-600/30 rounded-xl text-gray-300 placeholder-gray-500 font-semibold cursor-not-allowed backdrop-blur-sm"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Email Input */}
                            <div className="relative group">
                                <Mail className="absolute left-4 top-4 h-5 w-5 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors z-10" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email Address"
                                    className="w-full pl-12 pr-4 py-4 bg-black/20 border-2 border-white/10 rounded-xl text-white placeholder-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 font-semibold hover:bg-black/30 hover:border-fuchsia-400/30 backdrop-blur-sm"
                                />
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                            {/* Password Input */}
                            <div className="relative group">
                                <Lock className="absolute left-4 top-4 h-5 w-5 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors z-10" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    className="w-full pl-12 pr-14 py-4 bg-black/20 border-2 border-white/10 rounded-xl text-white placeholder-gray-300 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/20 transition-all duration-300 font-semibold hover:bg-black/30 hover:border-fuchsia-400/30 backdrop-blur-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 text-fuchsia-400 hover:text-fuchsia-300 transition-all duration-300 hover:scale-110 z-10"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="relative w-full py-4 px-6 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 hover:from-fuchsia-500 hover:via-pink-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-lg rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-fuchsia-500/50 overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {loading ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>LOADING...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="h-5 w-5" />
                                            <span>{isLogin ? "LOGIN & PLAY" : "JOIN THE GAME"}</span>
                                            <Zap className="h-5 w-5" />
                                        </>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </button>
                        </div>

                        {/* Message Display */}
                        {message && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 border border-fuchsia-500/20 rounded-xl backdrop-blur-sm animate-pulse">
                                <p className="text-fuchsia-200 text-sm font-bold text-center">{message}</p>
                            </div>
                        )}

                        {/* Toggle & Actions */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
                            <button
                                onClick={toggle}
                                className="text-fuchsia-400 hover:text-fuchsia-300 font-bold transition-all duration-300 hover:scale-110 group flex items-center gap-2"
                            >
                                <div className="w-2 h-2 bg-fuchsia-400 rounded-full group-hover:animate-ping"></div>
                                {isLogin ? "Create New Account" : "Already a Player?"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamerLogin
