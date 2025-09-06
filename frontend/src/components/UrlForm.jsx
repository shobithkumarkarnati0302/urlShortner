import React from 'react'
import { LinkIcon } from '@heroicons/react/24/outline'
import AnimatedButton from './AnimatedButton'
import Tooltip from './Tooltip'

export default function UrlForm({ longUrl, setLongUrl, customAlias, setCustomAlias, loading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 mb-4">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Long URL</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <LinkIcon className="h-5 w-5" />
        </div>
        <input
          type="url"
          placeholder="https://example.com/very/long/link"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          required
          className="pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm"
        />
      </div>

      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Custom alias (optional)</label>
      <input
        type="text"
        placeholder="my-alias"
        value={customAlias}
        onChange={e => setCustomAlias(e.target.value)}
        className="px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition shadow-sm"
      />

      <Tooltip label="Create a short link for your URL">
        <AnimatedButton
          type="submit"
          disabled={loading}
          className="group w-full text-white shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loading ? 'Shortening…' : 'Shorten URL'}
        </AnimatedButton>
      </Tooltip>
    </form>
  )
}
