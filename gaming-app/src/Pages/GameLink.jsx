import React from 'react'
import { useState } from 'react'
import assets from '../assets/assets'
import { useLocation, useNavigate } from 'react-router-dom'


const GameLink = () => {
  // Mock router functions for demonstration
  const location = useLocation()
  const navigate = useNavigate()
  const booking = location.state?.booking

 

  if (!booking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-purple-200/30">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No game found</h2>
            <button 
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-8 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-200/25 rounded-full blur-3xl"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 z-10">
        <img 
          src={assets.logo1} 
          alt="Logo" 
          className="h-12 w-auto filter drop-shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-lg w-full border border-purple-200/40 transform hover:scale-[1.02] transition-all duration-500">
          
          {/* Success icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
              Congratulations!
            </h2>
            <p className="text-lg text-gray-700 mb-2 font-medium">Your booking will be verified</p>
            <p className="text-gray-600 mb-6">Please check your bookings page</p>
          </div>

          {/* Link section */}
          <div className="space-y-4">
            <p className="text-gray-700 font-medium text-center">
              Click on the given link to join
            </p>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
              <p className="font-bold text-purple-700 mb-3 text-center uppercase tracking-wide text-sm">
                WhatsApp Group
              </p>
              
              <div className="flex items-center justify-center">
                <a 
                  href={booking.game.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Join WhatsApp Group</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              
              <div className="mt-4 p-3 bg-white/60 rounded-xl border border-purple-100">
                <p className="text-xs text-gray-500 text-center break-all font-mono">
                  {game.link}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameLink