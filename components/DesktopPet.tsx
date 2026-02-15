"use client"

import { useEffect, useRef, useState, useCallback, createContext, useContext } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Character Types
type CharacterTheme = "marvel" | "harrypotter"

interface Character {
    id: string
    name: string
    theme: CharacterTheme
    primaryColor: string
    secondaryColor: string
    accentColor: string
    description: string
    icon: string
}

// Character Database
export const characters: Character[] = [
    // Marvel Characters
    {
        id: "ironman",
        name: "Iron Man",
        theme: "marvel",
        primaryColor: "#B91C1C", // Red
        secondaryColor: "#F59E0B", // Gold
        accentColor: "#06B6D4", // Arc reactor blue
        description: "Genius billionaire with a high-tech suit",
        icon: "🦾",
    },
    {
        id: "spiderman",
        name: "Spider-Man",
        theme: "marvel",
        primaryColor: "#DC2626", // Red
        secondaryColor: "#1E40AF", // Blue
        accentColor: "#111827", // Black
        description: "Friendly neighborhood web-slinger",
        icon: "🕷️",
    },
    {
        id: "thor",
        name: "Thor",
        theme: "marvel",
        primaryColor: "#1E40AF", // Blue
        secondaryColor: "#FCD34D", // Gold
        accentColor: "#60A5FA", // Lightning
        description: "God of Thunder with Mjolnir",
        icon: "⚡",
    },
    {
        id: "hulk",
        name: "Hulk",
        theme: "marvel",
        primaryColor: "#16A34A", // Green
        secondaryColor: "#166534", // Dark green
        accentColor: "#86EFAC", // Light green
        description: "Strongest Avenger, smash everything!",
        icon: "💪",
    },
    {
        id: "captain",
        name: "Captain America",
        theme: "marvel",
        primaryColor: "#1E40AF", // Blue
        secondaryColor: "#DC2626", // Red
        accentColor: "#F3F4F6", // White
        description: "Super soldier with vibranium shield",
        icon: "🛡️",
    },
    {
        id: "deadpool",
        name: "Deadpool",
        theme: "marvel",
        primaryColor: "#991B1B", // Dark red
        secondaryColor: "#111827", // Black
        accentColor: "#F472B6", // Pink
        description: "Merc with a mouth, breaks the fourth wall",
        icon: "⚔️",
    },
    {
        id: "groot",
        name: "Groot",
        theme: "marvel",
        primaryColor: "#5D4037", // Brown
        secondaryColor: "#2E7D32", // Green
        accentColor: "#81C784", // Light green
        description: "I am Groot! Tree-like humanoid",
        icon: "🌳",
    },
    {
        id: "blackpanther",
        name: "Black Panther",
        theme: "marvel",
        primaryColor: "#111827", // Black
        secondaryColor: "#6B21A8", // Purple
        accentColor: "#A855F7", // Vibranium purple
        description: "King of Wakanda, enhanced by heart-shaped herb",
        icon: "🐆",
    },
    // Harry Potter Characters
    {
        id: "harry",
        name: "Harry Potter",
        theme: "harrypotter",
        primaryColor: "#1E40AF", // Gryffindor blue
        secondaryColor: "#DC2626", // Gryffindor red
        accentColor: "#FCD34D", // Gold
        description: "The Boy Who Lived, master of the Elder Wand",
        icon: "⚡",
    },
    {
        id: "hermione",
        name: "Hermione Granger",
        theme: "harrypotter",
        primaryColor: "#7C2D12", // Brown (hair)
        secondaryColor: "#DC2626", // Gryffindor
        accentColor: "#FDE047", // Book yellow
        description: "Brightest witch of her age",
        icon: "📚",
    },
    {
        id: "ron",
        name: "Ron Weasley",
        theme: "harrypotter",
        primaryColor: "#DC2626", // Red (hair)
        secondaryColor: "#F97316", // Orange
        accentColor: "#FCD34D", // Chess gold
        description: "Loyal friend, chess champion",
        icon: "♟️",
    },
    {
        id: "dumbledore",
        name: "Dumbledore",
        theme: "harrypotter",
        primaryColor: "#6B21A8", // Purple robes
        secondaryColor: "#FCD34D", // Gold
        accentColor: "#60A5FA", // Magic blue
        description: "Greatest wizard of all time",
        icon: "🧙",
    },
    {
        id: "snape",
        name: "Severus Snape",
        theme: "harrypotter",
        primaryColor: "#111827", // Black
        secondaryColor: "#374151", // Dark grey
        accentColor: "#22C55E", // Potion green
        description: "Half-Blood Prince, master of potions",
        icon: "🧪",
    },
    {
        id: "luna",
        name: "Luna Lovegood",
        theme: "harrypotter",
        primaryColor: "#F472B6", // Pink
        secondaryColor: "#A855F7", // Purple
        accentColor: "#FCD34D", // Blonde
        description: "Eccentric Ravenclaw, sees thestrals",
        icon: "🦅",
    },
    {
        id: "draco",
        name: "Draco Malfoy",
        theme: "harrypotter",
        primaryColor: "#166534", // Slytherin green
        secondaryColor: "#6B7280", // Silver
        accentColor: "#9CA3AF", // Blonde
        description: "Slytherin prince, pure-blood wizard",
        icon: "🐍",
    },
    {
        id: "hagrid",
        name: "Hagrid",
        theme: "harrypotter",
        primaryColor: "#5D4037", // Brown coat
        secondaryColor: "#92400E", // Dark brown
        accentColor: "#FDE047", // Umbrella pink
        description: "Keeper of Keys and Grounds, loves magical creatures",
        icon: "🦉",
    },
]

// Context for character selection
interface CharacterContextType {
    selectedCharacter: Character
    setSelectedCharacter: (char: Character) => void
    isSelectorOpen: boolean
    setIsSelectorOpen: (open: boolean) => void
}

const CharacterContext = createContext<CharacterContextType | null>(null)

export function CharacterProvider({ children }: { children: React.ReactNode }) {
    const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[0])
    const [isSelectorOpen, setIsSelectorOpen] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("selected-character")
        if (saved) {
            const char = characters.find(c => c.id === saved)
            if (char) setSelectedCharacter(char)
        }
    }, [])

    // Save to localStorage when changed
    const handleSetCharacter = (char: Character) => {
        setSelectedCharacter(char)
        localStorage.setItem("selected-character", char.id)
    }

    return (
        <CharacterContext.Provider
            value={{
                selectedCharacter,
                setSelectedCharacter: handleSetCharacter,
                isSelectorOpen,
                setIsSelectorOpen,
            }}
        >
            {children}
        </CharacterContext.Provider>
    )
}

export function useCharacter() {
    const context = useContext(CharacterContext)
    if (!context) throw new Error("useCharacter must be used within CharacterProvider")
    return context
}

// Character Selector Modal
export function CharacterSelector() {
    const { isSelectorOpen, setIsSelectorOpen, selectedCharacter, setSelectedCharacter } = useCharacter()
    const [activeTheme, setActiveTheme] = useState<"all" | CharacterTheme>("all")

    const filteredCharacters = activeTheme === "all"
        ? characters
        : characters.filter(c => c.theme === activeTheme)

    return (
        <AnimatePresence>
            {isSelectorOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setIsSelectorOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-2xl font-bold text-white mb-2">Choose Your Companion</h2>
                            <p className="text-gray-400">Select a character to accompany you while coding</p>
                        </div>

                        {/* Theme Filters */}
                        <div className="flex gap-2 p-4 border-b border-gray-800">
                            <button
                                onClick={() => setActiveTheme("all")}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTheme === "all"
                                    ? "bg-white text-black"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setActiveTheme("marvel")}
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTheme === "marvel"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                🦸 Marvel
                            </button>
                            <button
                                onClick={() => setActiveTheme("harrypotter")}
                                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${activeTheme === "harrypotter"
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                🪄 Harry Potter
                            </button>
                        </div>

                        {/* Character Grid */}
                        <div className="p-6 overflow-y-auto max-h-[50vh]">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {filteredCharacters.map((char) => (
                                    <motion.button
                                        key={char.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setSelectedCharacter(char)
                                            setIsSelectorOpen(false)
                                        }}
                                        className={`relative p-4 rounded-xl border-2 transition-all ${selectedCharacter.id === char.id
                                            ? "border-white bg-white/10"
                                            : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                                            }`}
                                    >
                                        {/* Character Avatar */}
                                        <div
                                            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3"
                                            style={{
                                                background: `linear-gradient(135deg, ${char.primaryColor}, ${char.secondaryColor})`,
                                            }}
                                        >
                                            {char.icon}
                                        </div>

                                        {/* Name */}
                                        <h3 className="font-bold text-white text-sm mb-1">{char.name}</h3>

                                        {/* Theme Badge */}
                                        <span
                                            className="text-xs px-2 py-1 rounded-full"
                                            style={{
                                                backgroundColor: char.theme === "marvel" ? "#DC2626" : "#7C3AED",
                                                color: "white",
                                            }}
                                        >
                                            {char.theme === "marvel" ? "Marvel" : "HP"}
                                        </span>

                                        {/* Selected Indicator */}
                                        {selectedCharacter.id === char.id && (
                                            <motion.div
                                                layoutId="selected"
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                                            >
                                                ✓
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-800 bg-gray-900/50">
                            <button
                                onClick={() => setIsSelectorOpen(false)}
                                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Main Desktop Pet Component
interface PetState {
    isTyping: boolean
    isMouseDown: boolean
    mouseX: number
    mouseY: number
    facingRight: boolean
    animation: "idle" | "typing" | "click" | "happy" | "super"
}

export function DesktopPet() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { selectedCharacter, setIsSelectorOpen } = useCharacter()

    const [petState, setPetState] = useState<PetState>({
        isTyping: false,
        isMouseDown: false,
        mouseX: 0,
        mouseY: 0,
        facingRight: true,
        animation: "idle",
    })
    const [showBubble, setShowBubble] = useState(false)
    const [bubbleText, setBubbleText] = useState("")
    const animationFrameRef = useRef<number>(0)
    const lastTypeTime = useRef(0)
    const idleTimerRef = useRef<NodeJS.Timeout>(null)

    // Get phrases based on character
    const getPhrases = useCallback(() => {
        const common = ["Typing...", "Coding! 💻", "Go! 🚀", "Work! 💪", "Nice! ✨"]

        const themeSpecific: Record<string, string[]> = {
            ironman: ["Jarvis, code! 🤖", "Building suit... 🦾", "Arc reactor at 100% ⚡"],
            spiderman: ["With great code... 🕷️", "Web slinging bugs! 🕸️", "Thwip thwip! 🕷️"],
            thor: ["By the hammer! 🔨", "Bringing thunder! ⚡", "Asgardian code! 🌩️"],
            hulk: ["HULK CODE! 💚", "SMASH BUGS! 👊", "HULK STRONGEST! 💪"],
            captain: ["Avengers assemble! 🛡️", "I can do this all day 🇺🇸", "On your left! 🏃"],
            deadpool: ["Chimichanga time! 🌯", "Breaking fourth wall 🎭", "Maximum effort! ⚔️"],
            groot: ["I am Groot! 🌳", "I am Groot? 🌱", "I am Groot! 🍃"],
            blackpanther: ["Wakanda forever! 🐆", "Vibranium code 💜", "Black Panther lives 🖤"],
            harry: ["Expecto Patronum! ✨", "Expelliarmus! ⚡", "I solemnly swear... 🗺️"],
            hermione: ["It's LeviOsa! 🪶", "10 points to code! 📚", "Accio solution! ✨"],
            ron: ["Bloody brilliant! 🧡", "Chess master move ♟️", "Wicked! 🎉"],
            dumbledore: ["Happiness can be found... ✨", "10 points! 🌟", "Magic is real 🪄"],
            snape: ["Always... 💚", "Turn to page 394 📖", "Potions master 🧪"],
            luna: ["Nargles! 🦋", "Thestrals see you 👻", "Wit beyond measure 🦅"],
            draco: ["My father will hear! 🐍", "Pureblood code 💚", "Slytherin pride 🐍"],
            hagrid: ["You're a wizard! 🧙", "Fluffy! 🐕", "I shouldn't have said... 🤫"],
        }

        return [...common, ...(themeSpecific[selectedCharacter.id] || [])]
    }, [selectedCharacter])

    // Draw Character based on selection
    const drawCharacter = useCallback((ctx: CanvasRenderingContext2D, state: PetState) => {
        const canvas = ctx.canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2 + 35
        const scale = 0.85
        const floatOffset = Math.sin(Date.now() / 1000) * 3

        ctx.save()
        ctx.translate(centerX, centerY + floatOffset)
        ctx.scale(state.facingRight ? scale : -scale, scale)

        const char = selectedCharacter

        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.3)"
        ctx.beginPath()
        ctx.ellipse(0, 70, 45, 12, 0, 0, Math.PI * 2)
        ctx.fill()

        // Draw based on character type
        if (char.theme === "marvel") {
            drawMarvelCharacter(ctx, char, state)
        } else {
            drawHarryPotterCharacter(ctx, char, state)
        }

        ctx.restore()
    }, [selectedCharacter])

    // Marvel Character Drawing
    const drawMarvelCharacter = (ctx: CanvasRenderingContext2D, char: Character, state: PetState) => {
        const isTyping = state.isTyping
        const typeOffset = isTyping ? Math.sin(Date.now() / 30) * 4 : 0

        // Body/Costume
        ctx.fillStyle = char.primaryColor
        ctx.beginPath()

        if (char.id === "hulk") {
            // Muscular body for Hulk
            ctx.ellipse(0, 40, 55, 45, 0, 0, Math.PI * 2)
        } else if (char.id === "thor") {
            // Cape
            ctx.fillStyle = char.secondaryColor
            ctx.beginPath()
            ctx.moveTo(-40, -20)
            ctx.lineTo(40, -20)
            ctx.lineTo(50, 70)
            ctx.lineTo(-50, 70)
            ctx.fill()
            ctx.fillStyle = char.primaryColor
            ctx.ellipse(0, 35, 45, 40, 0, 0, Math.PI * 2)
        } else if (char.id === "spiderman") {
            // Web pattern body
            ctx.ellipse(0, 35, 45, 40, 0, 0, Math.PI * 2)
            ctx.fill()
            // Web lines
            ctx.strokeStyle = "rgba(0,0,0,0.3)"
            ctx.lineWidth = 2
            for (let i = 0; i < 6; i++) {
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(Math.cos(i * Math.PI / 3) * 40, Math.sin(i * Math.PI / 3) * 40 + 35)
                ctx.stroke()
            }
        } else {
            // Standard body
            ctx.ellipse(0, 35, 45, 40, 0, 0, Math.PI * 2)
        }
        ctx.fill()

        // Arc reactor for Iron Man
        if (char.id === "ironman") {
            ctx.fillStyle = char.accentColor
            ctx.beginPath()
            ctx.arc(0, 25, 12, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = "#FFFFFF"
            ctx.beginPath()
            ctx.arc(0, 25, 6, 0, Math.PI * 2)
            ctx.fill()
            // Glow effect
            ctx.shadowColor = char.accentColor
            ctx.shadowBlur = 20
            ctx.stroke()
            ctx.shadowBlur = 0
        }

        // Shield for Captain America
        if (char.id === "captain") {
            const shieldY = 30
            // Red outer
            ctx.fillStyle = "#DC2626"
            ctx.beginPath()
            ctx.arc(0, shieldY, 25, 0, Math.PI * 2)
            ctx.fill()
            // White middle
            ctx.fillStyle = "#FFFFFF"
            ctx.beginPath()
            ctx.arc(0, shieldY, 18, 0, Math.PI * 2)
            ctx.fill()
            // Red inner
            ctx.fillStyle = "#DC2626"
            ctx.beginPath()
            ctx.arc(0, shieldY, 12, 0, Math.PI * 2)
            ctx.fill()
            // Blue center
            ctx.fillStyle = "#1E40AF"
            ctx.beginPath()
            ctx.arc(0, shieldY, 6, 0, Math.PI * 2)
            ctx.fill()
            // Star
            ctx.fillStyle = "#FFFFFF"
            drawStar(ctx, 0, shieldY, 5, 5, 2)
        }

        // Face
        ctx.fillStyle = char.id === "hulk" ? char.accentColor : "#FFE4C4"
        ctx.beginPath()
        ctx.ellipse(0, -5, 35, 30, 0, 0, Math.PI * 2)
        ctx.fill()

        // Mask for Spider-Man
        if (char.id === "spiderman") {
            ctx.fillStyle = char.secondaryColor
            ctx.beginPath()
            ctx.ellipse(0, -8, 36, 20, 0, 0, Math.PI * 2)
            ctx.fill()
            // Eyes
            ctx.fillStyle = "#FFFFFF"
            ctx.beginPath()
            ctx.ellipse(-12, -5, 8, 12, -0.3, 0, Math.PI * 2)
            ctx.ellipse(12, -5, 8, 12, 0.3, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = "#111827"
            ctx.beginPath()
            ctx.ellipse(-12, -5, 4, 8, -0.3, 0, Math.PI * 2)
            ctx.ellipse(12, -5, 4, 8, 0.3, 0, Math.PI * 2)
            ctx.fill()
        } else if (char.id === "deadpool") {
            // Mask
            ctx.fillStyle = char.primaryColor
            ctx.beginPath()
            ctx.ellipse(0, -5, 36, 28, 0, 0, Math.PI * 2)
            ctx.fill()
            // Eye patches
            ctx.fillStyle = "#111827"
            ctx.beginPath()
            ctx.ellipse(-12, -5, 8, 10, 0, 0, Math.PI * 2)
            ctx.ellipse(12, -5, 8, 10, 0, 0, Math.PI * 2)
            ctx.fill()
            // White eyes
            ctx.fillStyle = "#FFFFFF"
            ctx.beginPath()
            ctx.ellipse(-12, -5, 5, 3, 0, 0, Math.PI * 2)
            ctx.ellipse(12, -5, 5, 3, 0, 0, Math.PI * 2)
            ctx.fill()
        } else {
            // Regular eyes
            const eyeBounce = isTyping ? Math.sin(Date.now() / 50) * 2 : 0
            ctx.fillStyle = "#1F2937"
            ctx.beginPath()
            ctx.ellipse(-10, -5 + eyeBounce, 5, 7, 0, 0, Math.PI * 2)
            ctx.ellipse(10, -5 + eyeBounce, 5, 7, 0, 0, Math.PI * 2)
            ctx.fill()

            // Eye shine
            ctx.fillStyle = "#FFFFFF"
            ctx.beginPath()
            ctx.arc(-8, -8 + eyeBounce, 2, 0, Math.PI * 2)
            ctx.arc(12, -8 + eyeBounce, 2, 0, Math.PI * 2)
            ctx.fill()
        }

        // Mouth
        ctx.strokeStyle = "#1F2937"
        ctx.lineWidth = 2
        ctx.beginPath()
        if (isTyping) {
            ctx.arc(0, 12, 5, 0, Math.PI)
        } else {
            ctx.moveTo(-5, 12)
            ctx.quadraticCurveTo(0, 15, 5, 12)
        }
        ctx.stroke()

        // Arms with typing animation
        const armY = 25 + typeOffset

        // Left arm
        ctx.save()
        ctx.translate(-35, 20)
        ctx.rotate(isTyping ? -0.4 : -0.2)
        ctx.fillStyle = char.primaryColor
        ctx.beginPath()
        ctx.ellipse(0, 15, 12, 20, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Right arm
        ctx.save()
        ctx.translate(35, 20)
        ctx.rotate(isTyping ? 0.4 : 0.2)
        ctx.fillStyle = char.primaryColor
        ctx.beginPath()
        ctx.ellipse(0, 15, 12, 20, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Keyboard when typing
        if (isTyping) {
            ctx.fillStyle = "#1F2937"
            ctx.fillRect(-50, 55, 100, 30)
            ctx.fillStyle = "#4B5563"
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 3; j++) {
                    ctx.fillRect(-45 + i * 12, 58 + j * 8, 10, 6)
                }
            }
            // Random highlighted key
            ctx.fillStyle = char.accentColor
            const key = Math.floor(Date.now() / 100) % 24
            ctx.fillRect(-45 + (key % 8) * 12, 58 + Math.floor(key / 8) * 8, 10, 6)
        }

        // Mjolnir for Thor
        if (char.id === "thor" && !isTyping) {
            ctx.fillStyle = "#9CA3AF"
            ctx.fillRect(45, 20, 15, 25)
            ctx.fillStyle = "#4B5563"
            ctx.fillRect(42, 18, 21, 8)
        }
    }

    // Harry Potter Character Drawing
    const drawHarryPotterCharacter = (ctx: CanvasRenderingContext2D, char: Character, state: PetState) => {
        const isTyping = state.isTyping
        const typeOffset = isTyping ? Math.sin(Date.now() / 30) * 4 : 0

        // Robes/House colors
        ctx.fillStyle = char.primaryColor
        ctx.beginPath()
        ctx.ellipse(0, 35, 42, 38, 0, 0, Math.PI * 2)
        ctx.fill()

        // House scarf for some characters
        if (["harry", "hermione", "ron"].includes(char.id)) {
            ctx.fillStyle = char.secondaryColor
            ctx.fillRect(-40, 15, 80, 12)
            ctx.fillStyle = char.accentColor
            for (let i = 0; i < 8; i++) {
                ctx.fillRect(-35 + i * 10, 15, 5, 12)
            }
        }

        // Face
        ctx.fillStyle = "#FFE4C4"
        ctx.beginPath()
        ctx.ellipse(0, -5, 32, 28, 0, 0, Math.PI * 2)
        ctx.fill()

        // Glasses for Harry
        if (char.id === "harry") {
            ctx.strokeStyle = "#111827"
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(-10, -5, 8, 0, Math.PI * 2)
            ctx.arc(10, -5, 8, 0, Math.PI * 2)
            ctx.stroke()
            ctx.beginPath()
            ctx.moveTo(-2, -5)
            ctx.lineTo(2, -5)
            ctx.stroke()
            // Scar
            ctx.strokeStyle = "#DC2626"
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(-2, -15)
            ctx.lineTo(0, -12)
            ctx.lineTo(-2, -10)
            ctx.stroke()
        }

        // Eyes
        const eyeBounce = isTyping ? Math.sin(Date.now() / 50) * 2 : 0
        ctx.fillStyle = char.id === "luna" ? "#60A5FA" : "#1F2937" // Luna has blue eyes
        ctx.beginPath()
        ctx.ellipse(-8, -5 + eyeBounce, 4, 6, 0, 0, Math.PI * 2)
        ctx.ellipse(8, -5 + eyeBounce, 4, 6, 0, 0, Math.PI * 2)
        ctx.fill()

        // Beard for Dumbledore/Hagrid
        if (["dumbledore", "hagrid"].includes(char.id)) {
            ctx.fillStyle = "#F3F4F6"
            ctx.beginPath()
            ctx.ellipse(0, 15, 25, 20, 0, 0, Math.PI * 2)
            ctx.fill()
        }

        // Mouth
        ctx.strokeStyle = "#1F2937"
        ctx.lineWidth = 2
        ctx.beginPath()
        if (isTyping) {
            ctx.arc(0, 8, 4, 0, Math.PI)
        } else {
            ctx.moveTo(-4, 8)
            ctx.quadraticCurveTo(0, 11, 4, 8)
        }
        ctx.stroke()

        // Arms
        const armY = 25 + typeOffset

        // Left arm
        ctx.save()
        ctx.translate(-32, 20)
        ctx.rotate(isTyping ? -0.4 : -0.2)
        ctx.fillStyle = char.primaryColor
        ctx.beginPath()
        ctx.ellipse(0, 12, 10, 18, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Right arm - holding wand
        ctx.save()
        ctx.translate(32, 20)
        ctx.rotate(isTyping ? 0.4 : 0.2)
        ctx.fillStyle = char.primaryColor
        ctx.beginPath()
        ctx.ellipse(0, 12, 10, 18, 0, 0, Math.PI * 2)
        ctx.fill()

        // Wand
        if (!isTyping) {
            ctx.fillStyle = "#5D4037"
            ctx.fillRect(5, -10, 4, 30)
            // Magic sparkles
            if (char.id === "harry" || char.id === "dumbledore") {
                ctx.fillStyle = char.accentColor
                ctx.beginPath()
                ctx.arc(7, -15, 3, 0, Math.PI * 2)
                ctx.fill()
            }
        }
        ctx.restore()

        // Keyboard when typing
        if (isTyping) {
            ctx.fillStyle = "#1F2937"
            ctx.fillRect(-45, 50, 90, 25)
            ctx.fillStyle = "#4B5563"
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 3; j++) {
                    ctx.fillRect(-40 + i * 13, 53 + j * 7, 11, 5)
                }
            }
            ctx.fillStyle = char.accentColor
            const key = Math.floor(Date.now() / 100) % 21
            ctx.fillRect(-40 + (key % 7) * 13, 53 + Math.floor(key / 7) * 7, 11, 5)
        }

        // House crest badge
        ctx.fillStyle = char.secondaryColor
        ctx.beginPath()
        ctx.arc(20, -20, 8, 0, Math.PI * 2)
        ctx.fill()
    }

    // Helper function to draw star
    const drawStar = (ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
        let rot = Math.PI / 2 * 3
        let x = cx
        let y = cy
        let step = Math.PI / spikes

        ctx.beginPath()
        ctx.moveTo(cx, cy - outerRadius)
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius
            y = cy + Math.sin(rot) * outerRadius
            ctx.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius
            y = cy + Math.sin(rot) * innerRadius
            ctx.lineTo(x, y)
            rot += step
        }
        ctx.lineTo(cx, cy - outerRadius)
        ctx.closePath()
        ctx.fill()
    }

    // Animation loop
    useEffect(() => {
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
            const now = Date.now()
            lastTypeTime.current = now

            setPetState(prev => ({
                ...prev,
                isTyping: true,
                facingRight: prev.mouseX > 100,
            }))

            const phrases = getPhrases()
            if (Math.random() > 0.6) {
                setBubbleText(phrases[Math.floor(Math.random() * phrases.length)])
                setShowBubble(true)
                setTimeout(() => setShowBubble(false), 2500)
            }

            if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
            idleTimerRef.current = setTimeout(() => {
                setPetState(prev => ({ ...prev, isTyping: false }))
            }, 400)
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [getPhrases])

    // Mouse handler
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const container = containerRef.current
            if (!container) return

            const rect = container.getBoundingClientRect()
            setPetState(prev => ({
                ...prev,
                mouseX: e.clientX - rect.left,
                mouseY: e.clientY - rect.top,
                facingRight: e.clientX > rect.left + 100,
            }))
        }

        const handleMouseDown = () => {
            setPetState(prev => ({ ...prev, isMouseDown: true }))
            setBubbleText("Click! 🖱️")
            setShowBubble(true)
            setTimeout(() => setShowBubble(false), 1000)
        }

        const handleMouseUp = () => {
            setPetState(prev => ({ ...prev, isMouseDown: false }))
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

    // Idle animation
    useEffect(() => {
        const interval = setInterval(() => {
            if (!petState.isTyping && !petState.isMouseDown) {
                setPetState(prev => ({ ...prev, animation: "happy" }))
                setTimeout(() => {
                    setPetState(prev => ({ ...prev, animation: "idle" }))
                }, 2000)
            }
        }, 12000)

        return () => clearInterval(interval)
    }, [petState.isTyping, petState.isMouseDown])

    return (
        <>
            <div
                ref={containerRef}
                className="fixed top-4 right-4 z-[100] w-[220px] h-[180px] pointer-events-none select-none cursor-pointer"
                onClick={() => setIsSelectorOpen(true)}
                title="Click to change character"
            >
                {/* Character Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg z-10"
                    style={{
                        background: `linear-gradient(135deg, ${selectedCharacter.primaryColor}, ${selectedCharacter.secondaryColor})`,
                    }}
                >
                    {selectedCharacter.icon}
                </motion.div>

                {/* Speech bubble */}
                <AnimatePresence>
                    {showBubble && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-2xl text-sm font-bold shadow-xl border-2 whitespace-nowrap z-20"
                            style={{ borderColor: selectedCharacter.primaryColor }}
                        >
                            {bubbleText}
                            <div
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 rotate-45"
                                style={{ borderColor: selectedCharacter.primaryColor }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    width={220}
                    height={180}
                    className="w-full h-full"
                />

                {/* Click hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full pointer-events-none"
                >
                    Click to change
                </motion.div>
            </div>

            {/* Character Selector Modal */}
            <CharacterSelector />
        </>
    )
}
