import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './components/Header'
import UrlForm from './components/UrlForm'
import ResultCard from './components/ResultCard'
import HistoryList from './components/HistoryList'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import './App.css'
import './index.css'

function App() {
  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [copiedKey, setCopiedKey] = useState(null)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('url_history') || '[]')
      if (Array.isArray(saved)) setHistory(saved)
    } catch (e) {
      console.error('Failed to load history from localStorage', e)
    }
  }, [])

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

      const entry = { longUrl, shortUrl: res.data.shortUrl, createdAt: new Date().toISOString() }
      const next = [entry, ...history].slice(0, 50)
      setHistory(next)
      try { localStorage.setItem('url_history', JSON.stringify(next)) } catch {}
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
    setLoading(false)
  }

  const clearHistory = () => { setHistory([]); localStorage.removeItem('url_history') }

  const copy = async (value, key = null) => {
    try { await navigator.clipboard.writeText(value); setCopiedKey(key ?? value); setTimeout(() => setCopiedKey(null), 1200) } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Header />
        <div className="w-full bg-white/90 dark:bg-gray-900/60 backdrop-blur rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-6 md:p-8">
          <UrlForm
            longUrl={longUrl}
            setLongUrl={setLongUrl}
            customAlias={customAlias}
            setCustomAlias={setCustomAlias}
            loading={loading}
            onSubmit={handleSubmit}
          />

          <ResultCard shortUrl={shortUrl} onCopy={() => copy(shortUrl, 'latest')} />
          {error && <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-3 mt-2 text-red-700 dark:text-red-300 text-center animate-fade-in">{error}</div>}
          <HistoryList history={history} copiedKey={copiedKey} onCopy={copy} onClear={clearHistory} />
        </div>
      </div>

      {copiedKey==='latest' && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircleIcon className="w-4 h-4 text-green-400" /> Copied to clipboard
        </div>
      )}
    </div>
  )
}

export default App
