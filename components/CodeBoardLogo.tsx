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
      {/* Left: Code Symbol */}
      <div className="relative flex items-center justify-center">
        <span
          className="text-white text-3xl font-bold tracking-tighter"
          style={{ fontFamily: '"Cascadia Code", monospace' }}
        >
          {"[</>]"}
        </span>
      </div>

      {/* Center: CodeBoard Text */}
      <div className="flex flex-col ml-1">
        <span
          className="font-bold tracking-tight"
          style={{
            fontSize: "1.75rem",
            fontFamily: '"Cascadia Code", monospace'
          }}
        >
          <span className="text-green-500">C</span><span className="text-white">ode</span><span className="text-green-500">B</span><span className="text-white">oard</span>
        </span>
      </div>

      {/* Right: Orange Brick Icon */}
      <div className="relative -top-4 ml-1">
        <div className="flex flex-col gap-[2px]">
          <div className="flex gap-[2px] justify-end">
            <div className="w-2 h-1 bg-orange-500 rounded-[1px]" />
            <div className="w-3 h-1 bg-orange-500 rounded-[1px]" />
          </div>
          <div className="flex gap-[2px] justify-end">
            <div className="w-3 h-1 bg-orange-400 rounded-[1px]" />
            <div className="w-2 h-1 bg-orange-500 rounded-[1px]" />
            <div className="w-2 h-1 bg-orange-500 rounded-[1px]" />
          </div>
          <div className="flex gap-[2px] justify-end">
            <div className="w-2 h-1 bg-orange-500 rounded-[1px]" />
            <div className="w-3 h-1 bg-orange-400 rounded-[1px]" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Simple inline version for navbar/footer
export function CodeBoardLogoSimple({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <span
          className="text-white text-xl font-bold tracking-tighter"
          style={{ fontFamily: '"Cascadia Code", monospace' }}
        >
          {"[</>]"}
        </span>
      </div>

      {/* Text */}
      <span
        className="font-bold text-xl tracking-tight ml-1"
        style={{ fontFamily: '"Cascadia Code", monospace' }}
      >
        <span className="text-green-500">C</span><span className="text-white">ode</span><span className="text-green-500">B</span><span className="text-white">oard</span>
      </span>

      {/* Brick icon */}
      <div className="flex flex-col gap-[2px] -mt-3 ml-1">
        <div className="flex gap-[2px] justify-end">
          <div className="w-1.5 h-0.5 bg-orange-500 rounded-[1px]" />
          <div className="w-2 h-0.5 bg-orange-500 rounded-[1px]" />
        </div>
        <div className="flex gap-[2px] justify-end">
          <div className="w-2 h-0.5 bg-orange-400 rounded-[1px]" />
          <div className="w-1.5 h-0.5 bg-orange-500 rounded-[1px]" />
          <div className="w-1.5 h-0.5 bg-orange-500 rounded-[1px]" />
        </div>
        <div className="flex gap-[2px] justify-end">
          <div className="w-1.5 h-0.5 bg-orange-500 rounded-[1px]" />
          <div className="w-2 h-0.5 bg-orange-400 rounded-[1px]" />
        </div>
      </div>
    </div>
  )
}
