'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyState {
  [key: string]: boolean;
}

const KEYBOARD_LAYOUT = [
  [
    { key: 'Q', x: 0, y: 0 }, { key: 'W', x: 1, y: 0 }, { key: 'E', x: 2, y: 0 },
    { key: 'R', x: 3, y: 0 }, { key: 'T', x: 4, y: 0 }, { key: 'Y', x: 5, y: 0 },
    { key: 'U', x: 6, y: 0 }, { key: 'I', x: 7, y: 0 }, { key: 'O', x: 8, y: 0 },
    { key: 'P', x: 9, y: 0 },
  ],
  [
    { key: 'A', x: 0.5, y: 1 }, { key: 'S', x: 1.5, y: 1 }, { key: 'D', x: 2.5, y: 1 },
    { key: 'F', x: 3.5, y: 1 }, { key: 'G', x: 4.5, y: 1 }, { key: 'H', x: 5.5, y: 1 },
    { key: 'J', x: 6.5, y: 1 }, { key: 'K', x: 7.5, y: 1 }, { key: 'L', x: 8.5, y: 1 },
  ],
  [
    { key: 'Z', x: 1, y: 2 }, { key: 'X', x: 2, y: 2 }, { key: 'C', x: 3, y: 2 },
    { key: 'V', x: 4, y: 2 }, { key: 'B', x: 5, y: 2 }, { key: 'N', x: 6, y: 2 },
    { key: 'M', x: 7, y: 2 },
  ]
];

export default function UmaruInputMirror() {
  const [activeKeys, setActiveKeys] = useState<KeyState>({});
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastKey, setLastKey] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setActiveKeys(prev => ({ ...prev, [key]: true }));
      setLastKey(key);
      
      setTimeout(() => {
        setActiveKeys(prev => ({ ...prev, [key]: false }));
      }, 150);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      setActiveKeys(prev => ({ ...prev, [key]: false }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        setMousePos({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y))
        });
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const umaruHandX = 20 + (mousePos.x * 0.6);
  const umaruHandY = 45 + (mousePos.y * 0.3);

  return (
    <div ref={containerRef} className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gray-800 px-3 py-2 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono">Umaru Input Mirror</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      {/* Screen Area with Umaru */}
      <div ref={widgetRef} className="relative h-40 md:h-48 bg-gradient-to-b from-purple-900/20 to-gray-900 overflow-hidden">
        {/* Desk Surface */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gray-800/50 border-t border-gray-700" />
        
        {/* Cola Bottle */}
        <div className="absolute bottom-14 md:bottom-16 left-3 md:left-4 w-5 md:w-6 h-10 md:h-12">
          <div className="w-2.5 md:w-3 h-7 md:h-8 bg-red-600 mx-auto rounded-sm relative">
            <div className="absolute -top-1.5 md:-top-2 left-1/2 -translate-x-1/2 w-1.5 md:w-2 h-2 md:h-3 bg-red-700 rounded-t-sm" />
            <div className="absolute top-1.5 md:top-2 left-0 right-0 text-[5px] md:text-[6px] text-white font-bold text-center rotate-90">COLA</div>
          </div>
        </div>

        {/* Umaru Character */}
        <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2">
          {/* Hood/Head */}
          <motion.div 
            className="relative w-16 md:w-20 h-12 md:h-16 bg-orange-500 rounded-t-full"
            animate={{ 
              rotate: (mousePos.x - 50) * 0.1,
              y: isMouseDown ? 2 : 0
            }}
          >
            {/* Face */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11 md:w-14 h-9 md:h-12 bg-pink-100 rounded-t-full overflow-hidden">
              {/* Eyes */}
              <motion.div 
                className="absolute top-3 md:top-4 left-1.5 md:left-2 w-2.5 md:w-3 h-3 md:h-4 bg-gray-800 rounded-full"
                animate={{ x: (mousePos.x - 50) * 0.05 }}
              >
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
              </motion.div>
              <motion.div 
                className="absolute top-3 md:top-4 right-1.5 md:right-2 w-2.5 md:w-3 h-3 md:h-4 bg-gray-800 rounded-full"
                animate={{ x: (mousePos.x - 50) * 0.05 }}
              >
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full" />
              </motion.div>
              
              {/* Blush */}
              <div className="absolute bottom-2 md:bottom-3 left-0.5 md:w-3 h-1.5 md:h-2 bg-pink-300 rounded-full opacity-60" />
              <div className="absolute bottom-2 md:bottom-3 right-0.5 md:w-3 h-1.5 md:h-2 bg-pink-300 rounded-full opacity-60" />
              
              {/* Mouth */}
              <motion.div 
                className="absolute bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-1.5 md:w-2 h-1 bg-pink-400 rounded-full"
                animate={{ scaleY: isMouseDown ? 0.5 : 1 }}
              />
            </div>
            
            {/* Hood Ears */}
            <div className="absolute top-1.5 md:top-2 left-1.5 md:left-2 w-3 md:w-4 h-3 md:h-4 bg-orange-600 rounded-full" />
            <div className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-3 md:w-4 h-3 md:h-4 bg-orange-600 rounded-full" />
          </motion.div>

          {/* Body/Blanket */}
          <div className="w-20 md:w-24 h-10 md:h-12 bg-green-600 rounded-b-3xl mx-auto -mt-1.5 md:-mt-2 relative">
            <div className="absolute inset-0 bg-green-700 rounded-b-3xl opacity-30" />
            <div className="absolute top-1.5 md:top-2 left-3 md:left-4 w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-400 rounded-full" />
            <div className="absolute top-3 md:top-4 right-4 md:right-6 w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-400 rounded-full" />
          </div>

          {/* Arms/Hands */}
          <motion.div 
            className="absolute top-6 md:top-8 left-1.5 md:left-2 w-2.5 md:w-3 h-6 md:h-8 bg-pink-100 rounded-full origin-top"
            animate={{ 
              rotate: (mousePos.x - 50) * 0.3,
              x: (mousePos.x - 50) * 0.2
            }}
          >
            <div className="absolute bottom-0 w-3 md:w-4 h-3 md:h-4 bg-pink-100 rounded-full -left-0.5" />
          </motion.div>
          
          <motion.div 
            className="absolute top-6 md:top-8 right-1.5 md:right-2 w-2.5 md:w-3 h-6 md:h-8 bg-pink-100 rounded-full origin-top"
            animate={{ 
              rotate: (mousePos.x - 50) * 0.3,
              x: (mousePos.x - 50) * 0.2
            }}
          >
            <div className="absolute bottom-0 w-3 md:w-4 h-3 md:h-4 bg-pink-100 rounded-full -right-0.5" />
          </motion.div>
        </div>

        {/* Mini Keyboard on Desk */}
        <div className="absolute bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-10 bg-gray-800 rounded-lg p-0.5 md:p-1 shadow-lg">
          <div className="grid grid-cols-10 gap-0.5 h-full">
            {['Q','W','E','R','T','Y','U','I','O','P'].map((k) => (
              <motion.div
                key={k}
                className={`text-[5px] md:text-[6px] flex items-center justify-center rounded ${
                  activeKeys[k] ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-500'
                }`}
                animate={{ scale: activeKeys[k] ? 0.9 : 1 }}
              />
            ))}
          </div>
        </div>

        {/* Mini Mouse */}
        <motion.div 
          className="absolute bottom-2 md:bottom-3 right-6 md:right-8 w-5 md:w-6 h-6 md:h-8 bg-gray-700 rounded-lg shadow-md"
          animate={{ 
            x: (mousePos.x - 50) * 0.3,
            scale: isMouseDown ? 0.95 : 1
          }}
        >
          <div className="absolute top-0.5 md:top-1 left-1/2 -translate-x-1/2 w-1.5 md:w-2 h-2 md:h-3 bg-gray-600 rounded-t-sm" />
          {isMouseDown && (
            <div className="absolute inset-0 bg-purple-500/30 rounded-lg" />
          )}
        </motion.div>

        {/* Mouse Cursor Visual */}
        <motion.div
          className="absolute w-3 md:w-4 h-3 md:h-4 pointer-events-none"
          animate={{ 
            left: `${umaruHandX}%`, 
            top: `${umaruHandY}%`,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-3 md:w-4 h-3 md:h-4 drop-shadow-md">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.35Z" />
          </svg>
          {isMouseDown && (
            <div className="absolute top-3 md:top-4 left-3 md:left-4 w-1.5 md:w-2 h-1.5 md:h-2 bg-purple-400 rounded-full animate-ping" />
          )}
        </motion.div>
      </div>

      {/* Real Keyboard Display */}
      <div className="p-2 md:p-3 bg-gray-950">
        <div className="space-y-0.5 md:space-y-1">
          {KEYBOARD_LAYOUT.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-0.5">
              {row.map((keyData) => {
                const isActive = activeKeys[keyData.key];
                return (
                  <motion.div
                    key={keyData.key}
                    className={`
                      w-5 md:w-6 h-5 md:h-6 rounded text-[7px] md:text-[8px] font-bold flex items-center justify-center
                      transition-all duration-75 border-b-2
                      ${isActive 
                        ? 'bg-purple-600 text-white border-purple-800 translate-y-0.5' 
                        : 'bg-gray-800 text-gray-400 border-gray-900'
                      }
                    `}
                    style={{ marginLeft: rowIdx === 1 ? '6px' : rowIdx === 2 ? '12px' : '0' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {keyData.key}
                  </motion.div>
                );
              })}
            </div>
          ))}
          
          {/* Spacebar */}
          <div className="flex justify-center">
            <motion.div
              className={`
                w-24 md:w-32 h-4 md:h-5 rounded mt-0.5 border-b-2
                ${activeKeys[' '] 
                  ? 'bg-purple-600 border-purple-800 translate-y-0.5' 
                  : 'bg-gray-800 border-gray-900'
                }
              `}
            />
          </div>
        </div>

        {/* Last Key Indicator */}
        <div className="mt-1.5 md:mt-2 flex items-center justify-between text-[9px] md:text-[10px] text-gray-500 font-mono">
          <span>Last: {lastKey || '—'}</span>
          <span className={isMouseDown ? 'text-purple-400' : ''}>
            {isMouseDown ? 'CLICKING' : 'IDLE'}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="px-2 md:px-3 py-1.5 md:py-2 bg-gray-800/50 border-t border-gray-800">
        <div className="flex justify-between text-[9px] md:text-[10px] text-gray-400">
          <span>Pos: {mousePos.x.toFixed(0)}%, {mousePos.y.toFixed(0)}%</span>
          <span className="text-green-400">● Live</span>
        </div>
      </div>
    </div>
  );
}
