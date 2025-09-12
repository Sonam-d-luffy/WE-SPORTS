import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Users, Trash2, CheckCircle, AlertCircle, User, CreditCard, Hash, Gamepad2 } from 'lucide-react'

const HostBooking = () => {
    const [booking, setBooking] = useState([])
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const {gameId} = useParams()

    useEffect(() => {
        const fetchBookings = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/api/booking/games-booking/${gameId}`)
                setBooking(res.data.bookings)
            } catch (error) {
                setMessage(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [gameId])

    const deleteBooking = async(id) => {
        if(!window.confirm('Are you sure you want to delete this booking?')) return
        
        // Optimistic update
        const originalBookings = [...booking]
        setBooking(booking.filter((b) => b._id !== id))
        
        try {
            await axios.delete(`http://localhost:5000/api/booking/delete-booking/${id}`)
            setMessage('Booking deleted successfully')
            
            // Clear success message after 3 seconds
            setTimeout(() => setMessage(''), 3000)
        } catch (error) {
            // Rollback on error
            setBooking(originalBookings)
            setMessage(error.message)   
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mb-4 animate-spin">
                        <Gamepad2 className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-purple-200 text-lg">Loading bookings...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 p-6">
                {/* Header */}
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <button 
                            onClick={() => navigate('/hostPage')}
                            className="flex items-center text-purple-300 hover:text-white transition-colors duration-200 group backdrop-blur-sm bg-white/5 px-4 py-2 rounded-xl border border-white/10"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
                            Back to Host Page
                        </button>
                        
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent">
                                Booking Management
                            </h1>
                            <div className="flex items-center justify-center gap-2 text-purple-200">
                                <Users className="w-5 h-5" />
                                <span>{booking.length} Active Bookings</span>
                            </div>
                        </div>
                        
                        <div className="w-32"></div> {/* Spacer for centering */}
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm animate-fadeIn ${
                            message.includes('success') || message.includes('deleted')
                                ? 'bg-green-500/10 border-green-400/30 text-green-300' 
                                : 'bg-red-500/10 border-red-400/30 text-red-300'
                        }`}>
                            <div className="flex items-center gap-3">
                                {message.includes('success') || message.includes('deleted') ? (
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                )}
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                        </div>
                    )}

                    {/* Bookings Grid */}
                    {booking && booking.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {booking.map((b, index) => (
                                <div 
                                    key={b._id}
                                    className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300 animate-slideIn"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Card Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{b.username}</h3>
                                                <p className="text-purple-300 text-sm">Active Booking</p>
                                            </div>
                                        </div>
                                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-3 text-purple-200">
                                            <Hash className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm">User ID:</span>
                                            <span className="text-white font-mono text-sm">{b.userId}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 text-purple-200">
                                            <CreditCard className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm">Transaction:</span>
                                            <span className="text-white font-mono text-sm">{b.transactionId}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => deleteBooking(b._id)}
                                        className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2 group"
                                    >
                                        <Trash2 className="w-4 h-4 group-hover:animate-bounce" />
                                        Delete Booking
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full mb-6 opacity-50">
                                <Users className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">No Bookings Found</h3>
                            <p className="text-purple-300">There are currently no active bookings for this game.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style >{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-slideIn {
                    animation: slideIn 0.4s ease-out;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    )
}

export default HostBooking