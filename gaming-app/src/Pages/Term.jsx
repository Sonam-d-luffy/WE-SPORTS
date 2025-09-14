import React from "react";
import {
  Shield,
  Users,
  Gamepad2,
  Trophy,
  Wifi,
  Settings,
  CheckCircle,
  AlertTriangle,
  Crown,
  Zap,
  Target,
  Ban,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Term = () => {
  const navigate = useNavigate();
  const homePage = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl mx-auto">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          {/* Logo Section - Left */}
          <div className="flex items-center">
            <div className="flex items-center justify-center">
              <img
                src={assets.logo1}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-3xl transition-transform duration-500 hover:rotate-12 hover:scale-110 shadow-lg"
              />
              <div className="ml-3 hidden sm:block">
                <div className="text-white font-bold text-lg">Tournament</div>
                <div className="text-gray-300 text-sm">Gaming Hub</div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Right */}
          <div className="flex items-center space-x-3">
            <button
              onClick={homePage}
              className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-blue-300 transition-colors duration-300 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <span className="text-white font-medium group-hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base">
                Home
              </span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl animate-pulse">
              <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
            Tournament Terms
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300 mb-6">
            & Conditions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Terms Sections */}
        {/* (your sections stay the same, just keeping styling consistent) */}

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300 font-medium">Good luck, gamers!</span>
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Term;
