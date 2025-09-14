import React from "react";
import { Shield, Users, Gamepad2, Trophy, Wifi, Settings, CheckCircle, AlertTriangle, Crown, Zap, Target, Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Term = () => {
  const navigate = useNavigate()
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
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
  <img
    src={assets.logo1}
    className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 hover:rotate-12"
  />
</div>

            <div className="ml-3 hidden sm:block">
              <div className="text-white font-bold text-lg">Tournament</div>
              <div className="text-gray-300 text-sm">Gaming Hub</div>
            </div>
          </div>

          {/* Navigation Buttons - Right */}
          <div className="flex items-center space-x-3">
           
            
            {/* Home Button */}
            <button onClick={navigate('/')} className="group flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-blue-300 transition-colors duration-300 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9,22 9,12 15,12 15,22"/>
                </svg>
              </div>
              <span className="text-white font-medium group-hover:text-blue-300 transition-colors duration-300 text-sm sm:text-base">Home</span>
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
        <div className="space-y-8 sm:space-y-12">
          
          {/* Section 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Eligibility & Registration</h3>
            </div>
            <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p>Participants must meet the age requirement of 16 years or older (or as per local gaming regulations).</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p>Registration fees, once paid, are non-refundable under any circumstances.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p>Each participant/team must provide accurate and complete details during registration.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Ban className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p>Substitution of players is not allowed after registration unless approved by the organizers.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Gamepad2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Match Rules</h3>
            </div>
            <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed">
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p>Players must join the custom room/lobby on time as per the schedule provided. Late entries may lead to forfeiture.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Ban className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p>Only mobile devices or tablets are permitted—PC emulators or other devices are strictly prohibited.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <p>Use of third-party software, hacks, macros, scripts, or unfair modifications is strictly banned.</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <p>Stream-sniping, teaming with other squads, or intentionally disrupting matches will lead to immediate disqualification.</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p>Gameplay will be recorded and/or live-streamed. By participating, you consent to the use of your gameplay, username, and voice/video recordings.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Conduct & Fair Play</h3>
            </div>
            <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p>Maintain sportsmanship and respectful behavior toward other players, staff, and viewers.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Ban className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p>Harassment, discrimination, hate speech, or threats of any kind will result in permanent banning.</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p>Trespassing into restricted areas (e.g., admin-only lobbies or rooms) is not permitted.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Crown className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <p>Tournament officials' decisions are final and binding in all matters.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Prizes & Refund Policy</h3>
            </div>
            <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed">
              <div className="flex items-start space-x-3">
                <Trophy className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p>Prizes will be distributed only to the designated team leader or registered account details provided during sign-up.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Ban className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p>No refunds will be issued after registration or for players/teams that lose in the tournament.</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <p>In the case of cheating, fraud, or misconduct, winnings will be forfeited, and the team/player may be permanently banned.</p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Wifi className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Technical & Gameplay Issues</h3>
            </div>
            <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed">
              <div className="flex items-start space-x-3">
                <Wifi className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p>Players are responsible for ensuring stable internet connectivity and a functioning device.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Settings className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <p>Match restarts or replays will only occur if there is a server-side issue or organizer-approved reason.</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p>The organizers are not responsible for technical failures, disconnections, or lag on the player's end.</p>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl hover:bg-white/15 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Organizer Rights</h3>
            </div>
            <div className="space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed">
              <div className="flex items-start space-x-3">
                <Settings className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <p>The organizers reserve the right to modify schedules, rules, or formats at any time with prior notice.</p>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p>The tournament may be canceled or postponed under unforeseen circumstances, and refunds will only be issued if cancellation occurs before matches start.</p>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p>Any attempt to damage, disrupt, or exploit tournament operations may result in legal action.</p>
              </div>
            </div>
          </div>

          {/* Final Acknowledgment */}
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-green-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-4 animate-pulse">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Acknowledgment</h3>
            </div>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed">
              By registering, you confirm that you have read, understood, and agreed to these Terms & Conditions. 
              <span className="text-green-400 font-semibold"> Play fair, respect others, and enjoy the tournament.</span>
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
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