"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    <section className="relative w-full rounded-xl md:rounded-2xl p-4 md:p-6 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 md:shadow-xl overflow-hidden">
      <div className="absolute -top-12 md:-top-16 -right-12 md:-right-16 w-32 md:w-48 h-32 md:h-48 bg-indigo-600/20 blur-xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-purple-600/20 blur-xl rounded-full" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl md:text-2xl lg:text-3xl font-bold text-white"
          >
            Build. Track. Ship.
            <span className="text-indigo-500"> Faster.</span>
          </motion.h1>

          <p className="mt-2 text-zinc-400 text-sm">
            CodeBoard connects your projects, GitHub activity, and deployments
            into one elite dev dashboard.
          </p>

          <Link href="/dashboard/dev">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2.5 md:py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition min-h-[44px]"
            >
              Explore Projects
              <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/70 border border-zinc-800 rounded-xl p-3 md:p-4 backdrop-blur-sm md:backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Github size={16} />
            <span className="text-xs">Live Dev Activity</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 md:p-3 font-mono text-xs text-green-400 h-14 md:h-16 whitespace-pre-wrap break-words">
            {text}
            <span className="animate-pulse">|</span>
          </div>

          <div className="mt-2 md:mt-3 space-y-1">
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
