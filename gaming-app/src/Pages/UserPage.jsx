import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  
  // Mock assets for demonstration
 
  const navigate = useNavigate()
  
  // Mock navigation functions for demo
  const navigateToTournaments = () => {
     navigate('/tournaments')
  };
  
  const hosts = () => {
       navigate('/hosts')

  };

 
  return (
    <div className="min-h-screen relative overflow-hidden">
     

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Welcome to the <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Ultimate</span> Gaming Arena
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Join elite tournaments, connect with gaming legends, and dominate the competition
            </p>

            {/* Tournament Section - Transparent & Animated */}
            <div 
              onClick={navigateToTournaments}
              className="group relative overflow-hidden bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl mb-6 sm:mb-8 cursor-pointer transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:bg-opacity-20"
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute inset-0.5 bg-black bg-opacity-20 rounded-2xl"></div>
              
              <div className="relative z-10 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col items-center">
                  <div className="text-3xl sm:text-4xl md:text-6xl mb-2 sm:mb-3 group-hover:animate-bounce transition-all duration-300 group-hover:scale-110">🏆</div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-500 animate-pulse">
                    TOURNAMENTS
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-3 sm:mb-4 text-center max-w-sm group-hover:text-white transition-colors duration-300 px-2">
                    View tournaments and book your slots now
                  </p>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:text-black transition-all duration-500 shadow-lg group-hover:shadow-xl transform group-hover:-translate-y-1">
                    ENTER ARENA
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div 
                onClick={hosts}
                className="group bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-xl px-6 sm:px-10 py-4 sm:py-6 cursor-pointer hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <span className="text-2xl sm:text-3xl group-hover:animate-bounce">👑</span>
                  <span className="text-white font-semibold text-lg sm:text-xl">View Organization Leads</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 sm:space-x-8">
              <a 
                href="https://chat.whatsapp.com/BNLevJ1qqbuB4HsXTc7HNc" 
                className="group bg-green-500 hover:bg-green-400 p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                  </svg>
              </a>
              
              <a 
                href="https://youtube.com/@satyamxd.?si=bMCmJSQR7Ioft4CV"
                className="group bg-red-500 hover:bg-red-400 p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.instagram.com/satyamxd/"
                className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-20 bg-black bg-opacity-60 backdrop-blur-sm border-t border-white border-opacity-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-white text-base sm:text-lg font-semibold mb-4 sm:mb-0">
                Gaming Arena 2025
              </div>

            </div>
          </div>
        </footer>
      </div>

     
    </div>
  );
};

export default UserPage;