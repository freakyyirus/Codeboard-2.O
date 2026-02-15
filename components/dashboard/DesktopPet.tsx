"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PetState {
  x: number
  y: number
  isTyping: boolean
  isMouseDown: boolean
  mouseX: number
  mouseY: number
  facingRight: boolean
  animation: "idle" | "typing" | "click" | "happy"
}

// Set to true if you have GIF files in public/pet folder
const USE_GIFS = false

const gifUrls = {
  idle: "/pet/umaru-idle.gif",
  typing: "/pet/umaru-typing.gif",
  click: "/pet/umaru-click.gif",
  happy: "/pet/umaru-happy.gif",
}

export function DesktopPet() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [petState, setPetState] = useState<PetState>({
    x: 100,
    y: 0,
    isTyping: false,
    isMouseDown: false,
    mouseX: 0,
    mouseY: 0,
    facingRight: true,
    animation: "idle",
  })
  const [showBubble, setShowBubble] = useState(false)
  const [bubbleText, setBubbleText] = useState("")
  const animationFrameRef = useRef<number | undefined>(undefined)
  const idleTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Enhanced draw with floating animation
  const drawCharacter = useCallback((ctx: CanvasRenderingContext2D, state: PetState) => {
    const canvas = ctx.canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2 + 30
    const scale = 0.9

    // Floating effect
    const floatOffset = Math.sin(Date.now() / 1000) * 3

    ctx.save()
    ctx.translate(centerX, centerY + floatOffset)
    ctx.scale(state.facingRight ? scale : -scale, scale)

    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.2)"
    ctx.beginPath()
    ctx.ellipse(0, 65, 40, 10, 0, 0, Math.PI * 2)
    ctx.fill()

    // Body (orange hoodie)
    ctx.fillStyle = "#FF6B35"
    ctx.beginPath()
    ctx.ellipse(0, 45, 50, 40, 0, 0, Math.PI * 2)
    ctx.fill()

    // Hood
    ctx.fillStyle = "#E55A2B"
    ctx.beginPath()
    ctx.arc(0, -5, 55, Math.PI, 0)
    ctx.fill()

    // Face
    ctx.fillStyle = "#FFE4C4"
    ctx.beginPath()
    ctx.ellipse(0, 5, 38, 32, 0, 0, Math.PI * 2)
    ctx.fill()

    // Blush
    ctx.fillStyle = "#FFB6C1"
    ctx.globalAlpha = 0.6
    ctx.beginPath()
    ctx.ellipse(-22, 12, 10, 6, 0, 0, Math.PI * 2)
    ctx.ellipse(22, 12, 10, 6, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1

    // Eyes
    const eyeBounce = state.isTyping ? Math.sin(Date.now() / 50) * 2 : 0
    ctx.fillStyle = "#2D2D2D"
    
    ctx.beginPath()
    ctx.ellipse(-14, -2 + eyeBounce, 8, 10, 0, 0, Math.PI * 2)
    ctx.fill()
    
    ctx.beginPath()
    ctx.ellipse(14, -2 + eyeBounce, 8, 10, 0, 0, Math.PI * 2)
    ctx.fill()

    // Eye shine
    ctx.fillStyle = "#FFFFFF"
    ctx.beginPath()
    ctx.arc(-11, -6 + eyeBounce, 3, 0, Math.PI * 2)
    ctx.arc(17, -6 + eyeBounce, 3, 0, Math.PI * 2)
    ctx.fill()

    // Secondary shine
    ctx.beginPath()
    ctx.arc(-16, 0 + eyeBounce, 1.5, 0, Math.PI * 2)
    ctx.arc(12, 0 + eyeBounce, 1.5, 0, Math.PI * 2)
    ctx.fill()

    // Mouth
    ctx.strokeStyle = "#2D2D2D"
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    
    if (state.isTyping) {
      ctx.fillStyle = "#FF6B6B"
      ctx.beginPath()
      ctx.arc(0, 18, 6, 0, Math.PI)
      ctx.fill()
      ctx.stroke()
    } else if (state.animation === "happy") {
      ctx.beginPath()
      ctx.arc(0, 15, 8, 0.2, Math.PI - 0.2)
      ctx.stroke()
    } else {
      ctx.beginPath()
      ctx.moveTo(-6, 16)
      ctx.quadraticCurveTo(0, 20, 6, 16)
      ctx.stroke()
    }

    // Arms
    const typeArmOffset = state.isTyping ? Math.sin(Date.now() / 30) * 5 : 0
    
    // Left arm
    ctx.save()
    ctx.translate(-35, 25)
    ctx.rotate(-0.2 + (state.isTyping ? -0.3 : 0))
    ctx.fillStyle = "#FF6B35"
    ctx.beginPath()
    ctx.ellipse(0, 12 + typeArmOffset, 14, 22, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#FFE4C4"
    ctx.beginPath()
    ctx.arc(0, 28 + typeArmOffset, 9, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Right arm
    ctx.save()
    ctx.translate(35, 25)
    ctx.rotate(0.2 - (state.isTyping ? 0.3 : 0))
    ctx.fillStyle = "#FF6B35"
    ctx.beginPath()
    ctx.ellipse(0, 12 - typeArmOffset, 14, 22, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#FFE4C4"
    ctx.beginPath()
    ctx.arc(0, 28 - typeArmOffset, 9, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // Keyboard
    if (state.isTyping) {
      ctx.fillStyle = "#1a1a2e"
      ctx.fillRect(-50, 55, 100, 35)
      ctx.fillStyle = "#4a4a6a"
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 8; col++) {
          ctx.fillRect(-45 + col * 12, 58 + row * 10, 10, 8)
        }
      }
      // Highlight random key
      ctx.fillStyle = "#FF6B35"
      const highlightKey = Math.floor(Date.now() / 100) % 24
      const hx = -45 + (highlightKey % 8) * 12
      const hy = 58 + Math.floor(highlightKey / 8) * 10
      ctx.fillRect(hx, hy, 10, 8)
    }

    // Mouse when clicking
    if (state.isMouseDown) {
      ctx.fillStyle = "#FFFFFF"
      ctx.beginPath()
      ctx.ellipse(55, 55, 14, 20, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#CCCCCC"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = "#DDDDDD"
      ctx.fillRect(48, 48, 14, 8)
    }

    // Cola can when happy
    if (state.animation === "happy") {
      ctx.fillStyle = "#DC2626"
      ctx.fillRect(50, 20, 16, 25)
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "10px Arial"
      ctx.fillText("COLA", 52, 35)
    }

    ctx.restore()
  }, [])

  // Animation loop
  useEffect(() => {
    if (USE_GIFS) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      drawCharacter(ctx, petState)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [petState, drawCharacter])

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPetState(prev => ({
        ...prev,
        isTyping: true,
        facingRight: prev.x < window.innerWidth / 2,
        animation: "typing",
      }))

      const phrases = [
        "Typing...", "Coding! 💻", "Go! 🚀", "Work! 💪",
        "Nice! ✨", "Bug fix! 🐛", "Ship it! 📦"
      ]
      if (Math.random() > 0.6) {
        setBubbleText(phrases[Math.floor(Math.random() * phrases.length)])
        setShowBubble(true)
        setTimeout(() => setShowBubble(false), 2000)
      }

      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        setPetState(prev => ({
          ...prev,
          isTyping: false,
          animation: "idle",
        }))
      }, 500)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setPetState(prev => ({
        ...prev,
        mouseX: x,
        mouseY: y,
        facingRight: x > 100,
      }))
    }

    const handleMouseDown = () => {
      setPetState(prev => ({ ...prev, isMouseDown: true, animation: "click" }))
      setBubbleText("Click! 🖱️")
      setShowBubble(true)
      setTimeout(() => setShowBubble(false), 1000)
    }

    const handleMouseUp = () => {
      setPetState(prev => ({ ...prev, isMouseDown: false, animation: "idle" }))
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Idle animation - occasional happy
  useEffect(() => {
    const idleInterval = setInterval(() => {
      if (!petState.isTyping && !petState.isMouseDown) {
        setPetState(prev => ({ ...prev, animation: "happy" }))
        setTimeout(() => {
          setPetState(prev => ({ ...prev, animation: "idle" }))
        }, 2000)
      }
    }, 10000)

    return () => clearInterval(idleInterval)
  }, [petState.isTyping, petState.isMouseDown])

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-4 z-[100] w-[220px] h-[180px] pointer-events-none select-none"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm font-bold shadow-xl border-2 border-orange-200 whitespace-nowrap"
          >
            {bubbleText}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-orange-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character canvas */}
      {USE_GIFS ? (
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src={gifUrls[petState.animation]} 
            alt="Desktop Pet" 
            className="object-contain w-full h-full"
          />
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={220}
          height={180}
          className="w-full h-full"
        />
      )}

      {/* Mouse follower */}
      <motion.div
        className="absolute w-3 h-3 bg-orange-400/30 rounded-full pointer-events-none"
        animate={{
          x: petState.mouseX - 6,
          y: petState.mouseY - 6,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  )
}
