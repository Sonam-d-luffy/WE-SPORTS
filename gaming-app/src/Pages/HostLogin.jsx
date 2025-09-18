import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, User, Mail, Lock, Crown, Gamepad2, Trophy, Target, Sword, Shield, Star, Zap, Upload, Instagram, Youtube, MapPin, Eye, EyeOff } from 'lucide-react'
import { UserContext } from './UserContext'


const HostLogin = () => {
    const [isLogin , setIsLogin] = useState(false)
    const [message , setMessage] = useState('')
    const [image , setImage] = useState('')
    const [user , setUser] = useState(null)
      const [showPassword, setShowPassword] = useState(false)
    const [loading , setLoading] = useState(false)
        const {currentUser, setCurrentUser} = useContext(UserContext)
    
    const navigate = useNavigate()
    const homePage = () => {
      navigate('/')
    }
    const [formData , setFormData] = useState({
        name: '' , email: '' , password: '' , role: '' , instagram: '' ,youtube: '' , state: '' , district: '' , description: ''  , secretkey: '',local : '',image: '', pincode: ''
    })
    const toggle = () => {
         setIsLogin((prev) => !prev)
  
    }
    const handleChange = (e) => {
        setFormData({...formData , [e.target.name] : e.target.value})
    }
    const handleFile = (e) => {
        setImage(e.target.files[0])
    }

      // Fetch state & district using pincode
  const handlePincodeBlur = async () => {
    if (formData.pincode.length === 6) {
      try {
        const res = await axios.get(
          `/pincode/pincode/${formData.pincode}`
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
        setMessage("Invalid Pincode");
      }
    }
  };

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if(isLogin){
                const {email , password } = formData
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/host-auth/login` , {email , password})
                setMessage(res.data.message)
                alert(res.data.message)
                setUser(res.data.user)
                setCurrentUser(res.data.user)
            navigate('/hostPage')

               
            } else {
                const form = new FormData()
                Object.keys(formData).forEach((key) => {
                    if (key !== "image") {
      form.append(key, formData[key]);
    }
                })
                if(image) {
                    form.append('image' , image)
                }
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/host-auth/signup` , form ,{
                headers: {'Content-Type' : 'multipart/form-data'}
            })

            setUser(res.data.host)
                setCurrentUser(res.data.host)

            alert(res.data.message)
            setMessage(res.data.message)
            setFormData({
                name: '' , email: '' , password: '' , role: '' , instagram: '' ,youtube: '' , state: '' , district: '' , description: ''  , secretkey: '',local : '',image: '',pincode: ''
            })
            navigate('/hostPage')
            }
        } catch (error) {
  setMessage(error.response?.data?.message || error.message)
        }finally{
          setLoading(false)
        }
    }
    

     
    const gameIcons = [
        { Icon: Gamepad2, delay: '0s', duration: '6s' },
        { Icon: Trophy, delay: '1s', duration: '8s' },
        { Icon: Target, delay: '2s', duration: '7s' },
        { Icon: Sword, delay: '3s', duration: '9s' },
        { Icon: Shield, delay: '4s', duration: '5s' },
        { Icon: Star, delay: '5s', duration: '10s' },
        { Icon: Zap, delay: '6s', duration: '6s' },
        { Icon: Crown, delay: '7s', duration: '8s' },
    ]

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
                {/* Background Icons */}
                <div className="absolute inset-0 overflow-hidden opacity-5">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        >
                            <Gamepad2 className="w-8 h-8 text-white" />
                        </div>
                    ))}
                </div>
                
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-white rounded-full animate-spin"></div>
                        <h3 className="text-3xl font-black text-white bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
                            Loading...
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Game Icons */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                {gameIcons.map(({ Icon, delay, duration }, index) => (
                    <Icon
                        key={index}
                        className="absolute w-12 h-12 text-white animate-bounce"
                        style={{
                            top: `${Math.random() * 90 + 5}%`,
                            left: `${Math.random() * 90 + 5}%`,
                            animationDelay: delay,
                            animationDuration: duration
                        }}
                    />
                ))}
                {/* Additional floating elements */}
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <div className="w-full max-w-2xl">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <button 
                            onClick={homePage}
                            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-white/10 border border-white/20 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 mb-6 group"
                        >
                            <Home className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
                            <span>Home</span>
                        </button>
                        
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-white to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                                <Crown className="w-8 h-8 text-slate-900" />
                            </div>
                            <h2 className="text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent tracking-tight">
                                {isLogin ? "HOST LOGIN" : "HOST SIGNUP"}
                            </h2>
                        </div>
                    </div>

                    {/* Form Container */}
                    <div className="bg-gradient-to-br from-white/10 via-purple-500/5 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 relative overflow-hidden">
                        
                        {/* Form Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-white/10 opacity-50"></div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            
                            {!isLogin && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            <User className="w-4 h-4 inline mr-2" />
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    {/* Role */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            <Crown className="w-4 h-4 inline mr-2" />
                                            Role
                                        </label>
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                            placeholder="Your role"
                                        />
                                    </div>

                                       {/* Profile Image */}
                                    <div className="group md:col-span-2">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            <Upload className="w-4 h-4 inline mr-2" />
                                            Profile Image
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                name="image" 
                                                onChange={handleFile}
                                                id="imageUpload"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <label 
                                                htmlFor="imageUpload"
                                                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white transition-all duration-300 hover:bg-white/15 backdrop-blur-sm cursor-pointer flex items-center justify-center space-x-3 group-hover:border-purple-400/50"
                                            >
                                                <Upload className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                                                <span className="font-medium">
                                                    {image ? image.name : "Choose Profile Image"}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    {/* YouTube */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            <Youtube className="w-4 h-4 inline mr-2" />
                                            YouTube
                                        </label>
                                        <input
                                            type="url"
                                            name="youtube"
                                            placeholder="https://youtube.com/..."
                                            value={formData.youtube}
                                            onChange={handleChange}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                        />
                                        {formData.youtube && (
                                            <a href={formData.youtube} target="_blank" rel="noreferrer" className="text-purple-300 hover:text-white text-sm mt-1 inline-block transition-colors duration-300">
                                                Open YouTube link →
                                            </a>
                                        )}
                                    </div>

                                    {/* Instagram */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            <Instagram className="w-4 h-4 inline mr-2" />
                                            Instagram
                                        </label>
                                        <input
                                            type="url"
                                            name="instagram"
                                            placeholder="https://instagram.com/..."
                                            value={formData.instagram}
                                            onChange={handleChange}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                        />
                                        {formData.instagram && (
                                            <a href={formData.instagram} target="_blank" rel="noreferrer" className="text-purple-300 hover:text-white text-sm mt-1 inline-block transition-colors duration-300">
                                                Open Instagram link →
                                            </a>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="group md:col-span-2">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm resize-none"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    {/* Locality */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            <MapPin className="w-4 h-4 inline mr-2" />
                                            Locality
                                        </label>
                                        <input
                                            type="text"
                                            name="local"
                                            value={formData.local}
                                            onChange={handleChange}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                            placeholder="Your locality"
                                        />
                                    </div>

                                    {/* Pincode */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            onBlur={handlePincodeBlur}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                            placeholder="Enter pincode"
                                        />
                                    </div>

                                    {/* District */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            District
                                        </label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleChange}
                                            readOnly
                                            className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-4 text-white/70 cursor-not-allowed backdrop-blur-sm"
                                            placeholder="Auto-filled"
                                        />
                                    </div>

                                    {/* State */}
                                    <div className="group">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            readOnly
                                            className="w-full bg-white/5 border border-white/20 rounded-xl py-4 px-4 text-white/70 cursor-not-allowed backdrop-blur-sm"
                                            placeholder="Auto-filled"
                                        />
                                    </div>

                                    {/* Secret Key */}
                                    <div className="group md:col-span-2">
                                        <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                            <Shield className="w-4 h-4 inline mr-2" />
                                            Secret Key
                                        </label>
                                        <input
                                            type="text"
                                            name="secretkey"
                                            value={formData.secretkey}
                                            onChange={handleChange}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                            placeholder="Enter secret key"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email & Password - Always Visible */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Email */}
                                <div className="group">
                                    <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                        <Mail className="w-4 h-4 inline mr-2" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                {/* Password */}
                                <div className="group">
                                    <label className="block text-white/80 font-bold mb-2 text-sm uppercase tracking-wide">
                                        <Lock className="w-4 h-4 inline mr-2" />
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-white/40 transition-all duration-300 hover:bg-white/15 font-medium backdrop-blur-sm"
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-purple-600 via-white to-purple-600 text-slate-900 py-4 px-8 rounded-xl font-black text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 relative overflow-hidden group"
                                disabled={loading}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-purple-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Crown className="w-5 h-5" />
                                            <span>{isLogin ? "LOGIN" : "SIGNUP"}</span>
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Message Display */}
                        {message && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
                                <p className="text-white font-medium text-center">{message}</p>
                            </div>
                        )}

                        {/* Toggle Login/Signup */}
                      <div className="mt-8 text-center relative z-20">
  <p className="text-white/60 mb-4">
    {isLogin ? "Don't have an account?" : "Already have an account?"}
  </p>
  <button
    type="button"
    onClick={toggle}
    className="bg-gradient-to-r from-white/10 to-purple-500/20 border border-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg hover:from-white/20 hover:to-purple-500/30"
  >
    {isLogin ? "Go to Signup" : "Go to Login"}
  </button>
</div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default HostLogin
