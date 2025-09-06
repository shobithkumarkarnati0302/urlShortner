import React, { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export default function DarkModeToggle() {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme_mode')
    if (saved === 'dark' || saved === 'light') {
      setMode(saved)
      applyMode(saved)
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial = prefersDark ? 'dark' : 'light'
      setMode(initial)
      applyMode(initial)
    }
  }, [])

  const applyMode = (m) => {
    const root = document.documentElement
    if (m === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }

  const toggle = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    localStorage.setItem('theme_mode', next)
    applyMode(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
      <span className="text-sm hidden sm:inline">{mode === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  )
}
