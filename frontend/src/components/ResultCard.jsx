import React from 'react'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import Tooltip from './Tooltip'

export default function ResultCard({ shortUrl, onCopy }) {
  if (!shortUrl) return null
  return (
    <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center flex flex-col items-center gap-2 animate-fade-in">
      <p className="text-green-700 dark:text-green-300 font-semibold">Shortened URL (use/copy this link):</p>
      <div className="flex items-center gap-2">
        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-700 dark:text-indigo-300 underline break-all font-mono hover:text-pink-500 transition-colors">{shortUrl}</a>
        <Tooltip label="Copy to clipboard">
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 active:scale-95"
          >
            <ClipboardIcon className="w-4 h-4" /> Copy
          </button>
        </Tooltip>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">This link will redirect to your long URL.</span>
    </div>
  )
}
