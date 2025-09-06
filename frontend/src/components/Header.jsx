import React from 'react'
import { SparklesIcon } from '@heroicons/react/24/outline'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">URL Shortener</h1>
      </div>
      <DarkModeToggle />
    </div>
  )
}
