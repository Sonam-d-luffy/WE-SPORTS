import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const GameLink = () => {
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { gameId, tournamentId } = useParams()

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/booking/${tournamentId}/${gameId}/link`
        )
        setLink(res.data.gameLink)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch game link')
        setLoading(false)
      }
    }

    fetchLink()
  }, [gameId, tournamentId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-purple-700 text-lg">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-6">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center border border-purple-200">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">🎉 Congratulations!</h2>
        <p className="text-gray-700 mb-2">
          Your booking has been successfully verified.
        </p>
        <p className="text-gray-600 mb-6">
          Please check your <span className="font-semibold text-purple-600">Bookings</span> page for details.
        </p>

        <div className="bg-purple-50 p-6 rounded-xl shadow-inner border border-purple-200">
          <p className="text-lg font-semibold text-purple-700 mb-3">📌 Join the WhatsApp Group</p>

          {link ? (
            <>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 ease-in-out"
              >
                Join WhatsApp Group
              </a>
              <div className="mt-4 p-3 bg-white/60 rounded-xl border border-purple-100">
                <p className="text-xs text-gray-500 text-center break-all font-mono">
                  {link}
                </p>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-500 mt-3">⚠️ No link available for this booking</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameLink
