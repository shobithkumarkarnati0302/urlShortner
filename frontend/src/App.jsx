import { useState } from 'react'
import axios from 'axios'
import './App.css'
import './index.css'

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShortUrl('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/shorten', {
        longUrl,
        customAlias: customAlias || undefined,
      })
      setShortUrl(res.data.shortUrl)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 transition-all duration-700">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 relative overflow-hidden group hover:shadow-indigo-300 transition-shadow duration-300">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          URL Shortener
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <input
            type="url"
            placeholder="Enter long URL"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
            required
            className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm"
          />
          <input
            type="text"
            placeholder="Custom alias (optional)"
            value={customAlias}
            onChange={e => setCustomAlias(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 to-pink-400 text-white py-3 rounded-lg font-bold shadow-md hover:from-indigo-600 hover:to-pink-500 transition-all duration-200 active:scale-95 disabled:opacity-60"
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>
        {shortUrl && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center flex flex-col items-center gap-2 animate-fade-in">
            <p className="text-green-700 font-semibold">Shortened URL (use/copy this link):</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-700 underline break-all font-mono hover:text-pink-500 transition-colors">{shortUrl}</a>
            <span className="text-xs text-gray-500 mt-1">This link will redirect to your long URL.</span>
          </div>
        )}
        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2 text-red-700 text-center animate-fade-in">{error}</div>}
      </div>
    </div>
  )
}

export default App
