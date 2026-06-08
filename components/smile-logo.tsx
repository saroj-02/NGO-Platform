'use client'

import React, { useState, useEffect } from 'react'

export function SmileLogo({
  className = 'size-5',
  strokeWidth = 2.5,
  pureSvg = false,
}: {
  className?: string
  strokeWidth?: number
  pureSvg?: boolean
}) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (pureSvg) return
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % 5)
    }, 1500) // 1.5 seconds cycle per face
    return () => clearInterval(timer)
  }, [pureSvg])

  if (pureSvg) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 9.5C9 8.5 10 8.5 10.5 9.5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M13.5 9.5C14 8.5 15 8.5 15.5 9.5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d="M7.5 13.5C8.5 16 15.5 16 16.5 13.5"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cheek blushes */}
        <path
          d="M 6.5,12.2 C 6.1,11.8 5.4,11.8 5,12.2 C 4.6,12.6 4.6,13.3 5,13.7 L 6.5,15.2 L 8,13.7 C 8.4,13.3 8.4,12.6 8,12.2 C 7.6,11.8 6.9,11.8 6.5,12.2 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M 17.5,12.2 C 17.1,11.8 16.4,11.8 16,12.2 C 15.6,12.6 15.6,13.3 16,13.7 L 17.5,15.2 L 19,13.7 C 19.4,13.3 19.4,12.6 19,12.2 C 18.6,11.8 17.9,11.8 17.5,12.2 Z"
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    )
  }

  // Curated, beautiful, high-quality, locally hosted portrait photos of smiling Indian people of various ages
  // Ordered from child to old man (increasing order of age)
  const photos = [
    {
      src: '/images/logo/child.png',
      alt: 'Smiling child from India',
    },
    {
      src: '/images/logo/teen.png',
      alt: 'Smiling school kid from India',
    },
    {
      src: '/images/logo/youth.png',
      alt: 'Smiling young man from India',
    },
    {
      src: '/images/logo/adult.png',
      alt: 'Smiling adult woman from India',
    },
    {
      src: '/images/logo/elder.png',
      alt: 'Smiling senior citizen from India',
    },
  ]

  return (
    <div className={`relative rounded-full p-0.5 bg-gradient-to-tr from-brand to-rose-400 overflow-hidden shadow-md transition-all duration-500 ${className}`}>
      <div className="relative w-full h-full rounded-full overflow-hidden bg-secondary">
        {photos.map((photo, i) => (
          <img
            key={i}
            src={photo.src}
            alt={photo.alt}
            className={`absolute inset-0 w-full h-full object-cover rounded-full transition-all duration-700 ease-in-out transform ${
              stage === i ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
            }`}
          />
        ))}
        {/* Subtle border overlay to define shape inside container */}
        <div className="absolute inset-0 rounded-full border border-black/5 pointer-events-none" />
      </div>
    </div>
  )
}
