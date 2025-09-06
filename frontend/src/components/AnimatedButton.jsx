import React from 'react'

export default function AnimatedButton({ className = '', children, ...props }) {
  return (
    <button
      {...props}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-lg px-4 py-2 font-semibold transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-500 opacity-80 -z-10" />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white -z-10" />
      <span className="relative">{children}</span>
    </button>
  )
}
