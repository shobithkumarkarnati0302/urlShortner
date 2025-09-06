import React from 'react'

// Simple tooltip using Tailwind group-hover utilities
export default function Tooltip({ label, children, position = 'top' }) {
  const posClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }
  return (
    <div className="relative inline-flex group">
      {children}
      <div className={`pointer-events-none absolute ${posClasses[position]} z-40 hidden group-hover:block`}
           role="tooltip">
        <div className="px-2 py-1 text-[11px] rounded bg-gray-900 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  )
}
