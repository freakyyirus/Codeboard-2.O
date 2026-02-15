"use client"

import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function CodeBoardLogo({ size = "lg" }: LogoProps) {
  const scale = size === "sm" ? 0.6 : size === "md" ? 0.8 : 1

  return (
    <motion.div
      className="flex items-center gap-3"
      style={{ transform: `scale(${scale})`, transformOrigin: "left center" }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Code Symbol with Cursor */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Code brackets */}
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full"
          fill="none"
        >
          {/* Opening bracket */}
          <path
            d="M8 8L2 20L8 32"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Closing bracket */}
          <path
            d="M32 8L38 20L32 32"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Slash */}
          <path
            d="M26 6L14 34"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Green Cursor */}
        <motion.div
          className="absolute"
          style={{ right: -2, top: "50%" }}
          animate={{
            x: [0, 3, 0],
            y: [-50, -50, -50],
          }}
          transition={{
            x: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
          }}
        >
          <svg
            width="12"
            height="18"
            viewBox="0 0 12 18"
            fill="none"
          >
            <path
              d="M0 0L12 9L0 18V0Z"
              fill="#22C55E"
              stroke="#16A34A"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      </div>

      {/* Center: Codeboard Text */}
      <div className="flex flex-col">
        <span
          className="text-white font-bold italic tracking-wide"
          style={{
            fontSize: "1.5rem",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          Codeboard
        </span>
      </div>

      {/* Right: Orange Brick Icon (positioned above) */}
      <div className="relative -top-3 ml-1">
        <div className="flex flex-col gap-0.5">
          {/* Top row - offset */}
          <div className="flex gap-0.5">
            <div className="w-2 h-1.5 bg-orange-500 rounded-sm" />
            <div className="w-2 h-1.5 bg-orange-500 rounded-sm" />
            <div className="w-2 h-1.5 bg-orange-400 rounded-sm" />
          </div>
          {/* Bottom row */}
          <div className="flex gap-0.5">
            <div className="w-2 h-1.5 bg-orange-400 rounded-sm" />
            <div className="w-2 h-1.5 bg-orange-500 rounded-sm" />
            <div className="w-2 h-1.5 bg-orange-500 rounded-sm" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Simple inline version for navbar
export function CodeBoardLogoSimple({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Code brackets */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 40 40"
        className="text-white"
        fill="none"
      >
        <path
          d="M8 8L2 20L8 32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 8L38 20L32 32"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 6L14 34"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Text */}
      <span className="text-white font-bold italic text-xl tracking-wide">
        Codeboard
      </span>
      
      {/* Brick icon */}
      <div className="flex flex-col gap-0.5 -mt-2">
        <div className="flex gap-0.5">
          <div className="w-1.5 h-1 bg-orange-500 rounded-sm" />
          <div className="w-1.5 h-1 bg-orange-500 rounded-sm" />
          <div className="w-1.5 h-1 bg-orange-400 rounded-sm" />
        </div>
        <div className="flex gap-0.5">
          <div className="w-1.5 h-1 bg-orange-400 rounded-sm" />
          <div className="w-1.5 h-1 bg-orange-500 rounded-sm" />
          <div className="w-1.5 h-1 bg-orange-500 rounded-sm" />
        </div>
      </div>
    </div>
  )
}
