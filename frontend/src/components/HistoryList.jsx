import React from 'react'
import { CheckCircleIcon, ClipboardIcon, TrashIcon } from '@heroicons/react/24/outline'
import Tooltip from './Tooltip'

export default function HistoryList({ history, copiedKey, onCopy, onClear }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Your recent short URLs</h2>
        {history.length > 0 && (
          <Tooltip label="Remove all saved links from this browser">
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95"
              title="Clear history"
            >
              <TrashIcon className="w-4 h-4" /> Clear
            </button>
          </Tooltip>
        )}
      </div>

      {history.length > 0 ? (
        <ul className="mt-3 space-y-3 max-h-64 overflow-auto pr-1">
          {history.map((item, idx) => (
            <li key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-3 bg-white/70 dark:bg-gray-900/40 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <a
                  href={item.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-700 dark:text-indigo-300 underline break-all font-mono hover:text-pink-500 transition-colors"
                  title={item.shortUrl}
                >
                  {item.shortUrl}
                </a>
                <Tooltip label={copiedKey===idx ? 'Copied!' : 'Copy to clipboard'}>
                  <button
                    type="button"
                    onClick={() => onCopy(item.shortUrl, idx)}
                    className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md transition active:scale-95 ${copiedKey===idx ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'}`}
                  >
                    {copiedKey===idx ? <CheckCircleIcon className="w-4 h-4" /> : <ClipboardIcon className="w-4 h-4" />} {copiedKey===idx ? 'Copied' : 'Copy'}
                  </button>
                </Tooltip>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 break-all" title={item.longUrl}>
                → {item.longUrl}
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">No items yet. Shorten a link to see it here.</p>
      )}
    </div>
  )
}
