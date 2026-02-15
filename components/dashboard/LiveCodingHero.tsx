'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyPosition {
  key: string;
  row: number;
  col: number;
  width?: number;
}

const KEYBOARD_LAYOUT: KeyPosition[][] = [
  [
    { key: 'Q', row: 0, col: 0 }, { key: 'W', row: 0, col: 1 }, { key: 'E', row: 0, col: 2 },
    { key: 'R', row: 0, col: 3 }, { key: 'T', row: 0, col: 4 }, { key: 'Y', row: 0, col: 5 },
    { key: 'U', row: 0, col: 6 }, { key: 'I', row: 0, col: 7 }, { key: 'O', row: 0, col: 8 },
    { key: 'P', row: 0, col: 9 },
  ],
  [
    { key: 'A', row: 1, col: 0.5 }, { key: 'S', row: 1, col: 1.5 }, { key: 'D', row: 1, col: 2.5 },
    { key: 'F', row: 1, col: 3.5 }, { key: 'G', row: 1, col: 4.5 }, { key: 'H', row: 1, col: 5.5 },
    { key: 'J', row: 1, col: 6.5 }, { key: 'K', row: 1, col: 7.5 }, { key: 'L', row: 1, col: 8.5 },
  ],
  [
    { key: 'Z', row: 2, col: 1 }, { key: 'X', row: 2, col: 2 }, { key: 'C', row: 2, col: 3 },
    { key: 'V', row: 2, col: 4 }, { key: 'B', row: 2, col: 5 }, { key: 'N', row: 2, col: 6 },
    { key: 'M', row: 2, col: 7 },
  ]
];

const CODE_SNIPPETS = [
  { text: 'const ', color: 'text-purple-400', delay: 0 },
  { text: 'user ', color: 'text-blue-400', delay: 100 },
  { text: '= ', color: 'text-white', delay: 200 },
  { text: 'await ', color: 'text-purple-400', delay: 300 },
  { text: 'db.user', color: 'text-yellow-400', delay: 400 },
  { text: '.create({', color: 'text-white', delay: 500 },
  { text: '\n  ', color: 'text-gray-500', delay: 600 },
  { text: 'name:', color: 'text-green-400', delay: 700 },
  { text: ' "', color: 'text-orange-400', delay: 800 },
  { text: 'Alex', color: 'text-green-400', delay: 900 },
  { text: '",', color: 'text-orange-400', delay: 1000 },
  { text: '\n  ', color: 'text-gray-500', delay: 1100 },
  { text: 'role:', color: 'text-green-400', delay: 1200 },
  { text: ' "', color: 'text-orange-400', delay: 1300 },
  { text: 'dev', color: 'text-green-400', delay: 1400 },
  { text: '"', color: 'text-orange-400', delay: 1500 },
  { text: '\n});', color: 'text-white', delay: 1600 },
];

export default function LiveCodingHero() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [displayedCode, setDisplayedCode] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate typing effect
  useEffect(() => {
    if (currentIndex >= CODE_SNIPPETS.length) {
      // Reset after completion
      setTimeout(() => {
        setCurrentIndex(0);
        setDisplayedCode('');
      }, 3000);
      return;
    }

    const snippet = CODE_SNIPPETS[currentIndex];
    const timer = setTimeout(() => {
      setDisplayedCode(prev => prev + snippet.text);
      
      // Simulate key presses based on the text
      const chars = snippet.text.split('');
      chars.forEach((char, idx) => {
        setTimeout(() => {
          const upperChar = char.toUpperCase();
          if (/[A-Z]/.test(upperChar)) {
            setActiveKeys(prev => [...prev, upperChar]);
            setTimeout(() => {
              setActiveKeys(prev => prev.filter(k => k !== upperChar));
            }, 100);
          }
        }, idx * 50);
      });
      
      setCurrentIndex(prev => prev + 1);
    }, snippet.delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getKeyPosition = (key: string) => {
    for (const row of KEYBOARD_LAYOUT) {
      const keyData = row.find(k => k.key === key);
      if (keyData) return keyData;
    }
    return null;
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto p-4 md:p-8">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-3xl rounded-full animate-pulse" />
      
      {/* Main Container */}
      <motion.div 
        className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Header Bar */}
        <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-gray-950/50 border-b border-gray-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-500 font-mono">main.tsx — Codeboard</span>
          </div>
        </div>

        {/* Screen Content */}
        <div className="p-4 md:p-6 min-h-[150px] md:min-h-[200px] font-mono text-xs md:text-sm leading-relaxed">
          <AnimatePresence>
            <motion.div
              key={displayedCode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-pre-wrap"
            >
              {CODE_SNIPPETS.slice(0, currentIndex).map((snippet, idx) => (
                <span key={idx} className={snippet.color}>
                  {snippet.text}
                </span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-1.5 h-4 md:h-5 bg-purple-400 ml-1 align-middle"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Keyboard */}
        <div className="relative bg-gray-950 p-4 md:p-6 border-t border-gray-800">
          {/* Keyboard Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none" />
          
          <div className="relative max-w-2xl mx-auto overflow-x-auto">
            {KEYBOARD_LAYOUT.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1 mb-2">
                {row.map((keyData) => {
                  const isActive = activeKeys.includes(keyData.key);
                  return (
                    <motion.div
                      key={keyData.key}
                      className={`
                        relative w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center
                        font-bold text-xs transition-all duration-75 flex-shrink-0
                        ${isActive 
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 scale-95' 
                          : 'bg-gray-800 text-gray-400 border-b-4 border-gray-900 hover:bg-gray-700'
                        }
                      `}
                      style={{ marginLeft: `${(keyData.col % 1) * 20}px` }}
                      animate={isActive ? { y: 2, borderBottomWidth: 0 } : { y: 0 }}
                    >
                      {keyData.key}
                      
                      {/* Key Press Ripple Effect */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-purple-400 rounded-lg"
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
            
            {/* Spacebar */}
            <div className="flex justify-center mt-2">
              <motion.div
                className={`
                  w-48 md:w-64 h-8 md:h-10 rounded-lg bg-gray-800 border-b-4 border-gray-900
                  ${activeKeys.includes('SPACE') ? 'bg-purple-600 scale-95 border-b-0' : ''}
                `}
              />
            </div>
          </div>

          {/* Animated Hands Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 pointer-events-none">
            <motion.div
              className="absolute bottom-2 md:bottom-4 left-1/4 w-16 md:w-20 h-16 md:h-24 bg-gradient-to-t from-pink-200/20 to-transparent rounded-full blur-xl"
              animate={{
                x: activeKeys.length > 0 ? [0, 10, -10, 0] : 0,
                y: activeKeys.length > 0 ? [0, -5, 0] : 0,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className="absolute bottom-2 md:bottom-4 right-1/4 w-16 md:w-20 h-16 md:h-24 bg-gradient-to-t from-pink-200/20 to-transparent rounded-full blur-xl"
              animate={{
                x: activeKeys.length > 0 ? [0, -10, 10, 0] : 0,
                y: activeKeys.length > 0 ? [0, -5, 0] : 0,
              }}
              transition={{ duration: 0.2, delay: 0.05 }}
            />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Stats Badge */}
      <motion.div 
        className="absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Live Coding
      </motion.div>
    </div>
  );
}
