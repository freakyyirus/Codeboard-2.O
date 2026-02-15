"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";

const codeSnippets = [
  "git commit -m 'Ship fast 🚀'",
  "npm install codeboard",
  "const build = 'elite';",
  "deploy --prod",
];

export default function HeroAttraction() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [snippet, setSnippet] = useState(0);

  // typing animation loop
  useEffect(() => {
    const current = codeSnippets[snippet];
    if (index < current.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + current[index]);
        setIndex(index + 1);
      }, 40);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setIndex(0);
        setSnippet((prev) => (prev + 1) % codeSnippets.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [index, snippet]);

  return (
    <section className="relative w-full rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 shadow-xl overflow-hidden">
      
      {/* glow background */}
      <div className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-600/20 blur-2xl sm:blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-purple-600/20 blur-2xl sm:blur-3xl rounded-full" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
          >
            Build. Track. Ship.
            <span className="text-indigo-500"> Faster.</span>
          </motion.h1>

          <p className="mt-3 sm:mt-4 text-zinc-400 text-sm sm:text-base">
            CodeBoard connects your projects, GitHub activity, and deployments
            into one elite dev dashboard.
          </p>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-6 flex items-center justify-center md:justify-start gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition w-full md:w-auto"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </motion.button>
        </div>

        {/* RIGHT SIDE - ANIMATION CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 border border-zinc-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-zinc-400 mb-2 sm:mb-3 text-sm">
            <Github className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            Live Dev Activity
          </div>

          {/* typing animation */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm text-green-400 h-16 sm:h-20 md:h-24">
            {text}
            <span className="animate-pulse">|</span>
          </div>

          {/* mock GitHub activity */}
          <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Commits</span>
              <span className="text-white font-medium">128</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Repos</span>
              <span className="text-white font-medium">14</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Deployments</span>
              <span className="text-white font-medium">32</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}