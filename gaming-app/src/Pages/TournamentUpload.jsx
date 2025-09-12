import React, { useState, useRef } from 'react';
import axios from 'axios'
import { Upload, Gamepad2, Zap, Trophy, Image, Sparkles, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TournamentUpload = () => {
  //const [tournaments , setTournaments] = useState([])
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  const [formdata, setFormdata] = useState({
    gameName: '',
    description: '',
    live: '',
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormdata({...formdata, [e.target.name]: e.target.value});
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // const handleSelectChange = (e) => {
  //   setFormdata({
  //     ...formdata,
  //     [e.target.name]: e.target.value === "yes" ? true : false
  //   });
  // };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("gameName", formdata.gameName);
      data.append("description", formdata.description);
      data.append("live", formdata.live);
      //console.log(formdata);
      if(image) {
        data.append('image', image);
      }

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/games/gamesUpload`, data, {headers: {'Content-Type': 'multipart/form-data'}});
      // console.log(res.data);
      //setTournaments(res.data.tournaments)
      // setMessage(res.data.message)
      setFormdata({
         gameName: '',
    description: '',
    live: '',
      })
      setImage(null)
      navigate('/hostTournament')
    } catch (error) {
      // setMessage(error.message || 'Error occured')
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden font-elegant">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-blue-600/10 to-violet-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white/10"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-float shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl mb-8 shadow-2xl shadow-purple-600/20 animate-bounce relative">
              <Trophy className="w-12 h-12 text-white" />
              <div className="absolute inset-0 bg-white/10 rounded-3xl animate-ping"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent mb-6 tracking-wider transform hover:scale-105 transition-transform duration-300 cursor-default">
              UPLOAD TOURNAMENT
            </h2>
            <p className="text-2xl text-purple-300 font-medium tracking-wide animate-pulse">
              ⚡ UNLEASH THE BEAST ⚡
            </p>
          </div>
          <button
  onClick={() => navigate("/hostPage")}
  className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
>
  ⬅ Back
</button>

          {/* Main Form Container */}
          <div className="bg-gray-900/90 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-10 shadow-2xl shadow-black/50 relative overflow-hidden hover:shadow-purple-900/30 transition-all duration-500">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-indigo-600/5 to-violet-600/5 rounded-3xl"></div>
            
            <div className="relative z-10 space-y-8">
              {/* Game Name Field */}
              <div className="space-y-3">
                <label className="flex items-center text-lg font-medium text-purple-300 tracking-wide mb-4">
                  <Gamepad2 className="w-6 h-6 mr-3 text-purple-400 animate-bounce" />
                  🎮 GAME NAME
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    name="gameName"
                    value={formdata.gameName}
                    onChange={handleChange}
                    className="w-full px-8 py-5 bg-gray-800/50 border border-purple-500/50 rounded-2xl text-purple-100 placeholder-purple-400/70 focus:outline-none focus:border-purple-400 focus:bg-gray-800/70 focus:scale-105 transition-all duration-300 text-xl font-medium shadow-lg hover:shadow-purple-900/30"
                    placeholder="Enter epic game name..."
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Sparkles className="w-6 h-6 text-purple-400 animate-spin" />
                  </div>
                </div>
              </div>

              {/* Description Field */}
              <div className="space-y-3">
                <label className="flex items-center text-lg font-medium text-purple-300 tracking-wide mb-4">
                  <Flame className="w-6 h-6 mr-3 text-indigo-400 animate-pulse" />
                  🔥 DESCRIPTION
                </label>
                <div className="relative group">
                  <textarea
                    name="description"
                    value={formdata.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-8 py-5 bg-gray-800/50 border border-purple-500/50 rounded-2xl text-purple-100 placeholder-purple-400/70 focus:outline-none focus:border-purple-400 focus:bg-gray-800/70 focus:scale-105 transition-all duration-300 text-xl font-medium shadow-lg hover:shadow-purple-900/30 resize-none"
                    placeholder="Describe your legendary tournament..."
                    required
                  />
                  <div className="absolute right-4 bottom-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Live Status */}
              <div className="space-y-3">
                <label className="flex items-center text-lg font-medium text-purple-300 tracking-wide mb-4">
                  <Zap className="w-6 h-6 mr-3 text-violet-400 animate-bounce" />
                  ⚡ LIVE STATUS
                </label>
                <div className="relative">
                  <select
                    name="live"
                    value={formdata.live}
                    onChange={handleChange}
                    className="w-full px-8 py-5 bg-gray-800/50 border border-purple-500/50 rounded-2xl text-purple-100 focus:outline-none focus:border-purple-400 focus:bg-gray-800/70 focus:scale-105 transition-all duration-300 text-xl font-medium shadow-lg hover:shadow-purple-900/30 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-gray-800 text-purple-100 font-medium">-- SELECT STATUS --</option>
                    <option value="yes" className="bg-gray-800 text-purple-100 font-medium">🔴 YES - LIVE NOW!</option>
                    <option value="no" className="bg-gray-800 text-purple-100 font-medium">⭐ NO - COMING SOON</option>
                  </select>
                  <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="flex items-center text-lg font-medium text-purple-300 tracking-wide mb-4">
                  <Image className="w-6 h-6 mr-3 text-indigo-400 animate-pulse" />
                  🎨 GAME IMAGE
                </label>
                
                {/* Image Upload Zone */}
                <div 
                  className={`relative border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer group overflow-hidden ${
                    dragActive 
                      ? 'border-purple-400 bg-purple-900/20 scale-105' 
                      : imagePreview 
                      ? 'border-green-400 bg-green-900/20' 
                      : 'border-purple-500/50 bg-gray-800/30 hover:border-purple-400 hover:bg-purple-900/10 hover:scale-102'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                    required
                  />
                  
                  {imagePreview ? (
                    /* Image Preview */
                    <div className="relative p-4">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                          src={imagePreview}
                          alt="Game Preview"
                          className="w-full h-64 object-cover"
                        />
                        
                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-6">
                          <div className="text-white">
                            <p className="font-bold text-xl">🔥 EPIC IMAGE LOADED!</p>
                            <p className="text-sm opacity-80">Click to change image</p>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 hover:scale-110 shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                        
                        {/* Glowing Border Animation */}
                        <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor'}}></div>
                      </div>
                    </div>
                  ) : (
                    /* Upload Zone */
                    <div className="p-12 text-center">
                      {/* Upload Icon with Animation */}
                      <div className="relative mb-6">
                        <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-600/30 transform group-hover:scale-110 transition-transform duration-300">
                          <Upload className="w-12 h-12 text-white animate-bounce" />
                        </div>
                        
                        {/* Floating Sparkles */}
                        <div className="absolute -top-2 -right-2">
                          <Sparkles className="w-6 h-6 text-purple-400 animate-spin" />
                        </div>
                        <div className="absolute -bottom-2 -left-2">
                          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                        </div>
                      </div>
                      
                      {/* Upload Text */}
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-purple-200 mb-2">
                          {dragActive ? '🔥 DROP IT LIKE ITS HOT! 🔥' : '📸 DRAG & DROP YOUR MASTERPIECE'}
                        </h3>
                        <p className="text-lg font-medium text-purple-300">
                          or <span className="underline">click here to browse</span>
                        </p>
                        <p className="text-sm text-purple-400 font-medium">
                          PNG, JPG, GIF up to 10MB ⚡
                        </p>
                      </div>
                      
                      {/* Upload Stats */}
                      <div className="mt-8 flex justify-center space-x-6 text-xs font-medium text-purple-300">
                        <div className="text-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1 animate-pulse"></div>
                          <p>HIGH QUALITY</p>
                        </div>
                        <div className="text-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1 animate-pulse delay-150"></div>
                          <p>FAST UPLOAD</p>
                        </div>
                        <div className="text-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1 animate-pulse delay-300"></div>
                          <p>SECURE</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Drag Overlay */}
                  {dragActive && (
                    <div className="absolute inset-0 bg-purple-600/20 flex items-center justify-center rounded-3xl">
                      <div className="text-center">
                        <Upload className="w-16 h-16 text-purple-300 mx-auto mb-4 animate-bounce" />
                        <p className="text-2xl font-bold text-purple-200">RELEASE TO UPLOAD! 🚀</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* File Info */}
                {image && (
                  <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl p-4 border border-purple-500/30 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                        <span className="font-medium text-purple-200">
                          📁 {image.name} ({(image.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <div className="text-green-400 font-medium">✅ READY TO UPLOAD</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 hover:from-purple-700 hover:via-indigo-700 hover:to-violet-700 text-white font-bold text-2xl rounded-2xl shadow-2xl shadow-purple-900/50 hover:shadow-purple-800/60 transform hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <Trophy className="w-8 h-8 mr-4 animate-spin" />
                  🚀 UPLOAD TOURNAMENT 🚀
                  <Flame className="w-8 h-8 ml-4 animate-bounce" />
                </div>
              </button>
            </div>

            {/* Success/Error Message */}
            {message && (
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-2xl text-center font-medium text-xl text-purple-200 animate-fade-in shadow-lg">
                ✨ {message} ✨
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

          .font-elegant {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            font-feature-settings: 'cv11' 1, 'ss01' 1;
            letter-spacing: 0.015em;
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.6;
            }
            50% { 
              transform: translateY(-30px) rotate(180deg); 
              opacity: 1;
            }
          }

          @keyframes fade-in {
            from { 
              opacity: 0; 
              transform: translateY(30px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }

          .animate-float {
            animation: float 5s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fade-in 0.8s ease-out;
          }

          input:focus, textarea:focus, select:focus {
            transform: scale(1.02);
            box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.2), 0 0 30px rgba(147, 51, 234, 0.1);
          }

          .hover\\:scale-102:hover {
            transform: scale(1.02);
          }

          /* Custom scrollbar for webkit browsers */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(17, 24, 39, 0.5);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #8b5cf6, #6366f1);
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #7c3aed, #4f46e5);
          }
        `}
      </style>
    </div>
  );
};

export default TournamentUpload;