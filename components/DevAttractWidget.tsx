"use client";

import { useEffect, useState } from "react";

const texts = [
  "Building in public 🚀",
  "Shipping features daily ⚡",
  "Code. Deploy. Repeat.",
  "Open for collaboration 🤝",
];

export default function DevAttractWidget() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const current = texts[index];
    const typing = setInterval(() => {
      setDisplay(current.slice(0, i));
      i++;
      if (i > current.length) clearInterval(typing);
    }, 40);

    const next = setTimeout(() => {
      setIndex((prev) => (prev + 1) % texts.length);
      setDisplay("");
    }, 3000);

    return () => {
      clearInterval(typing);
      clearTimeout(next);
    };
  }, [index]);

  return (
    <div className="fixed right-4 top-1/3 z-50">
      <div className="group w-60 hover:w-72 transition-all duration-300">
        
        {/* Glow border */}
        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 animate-pulse">
          
          {/* Glass card */}
          <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-4 shadow-2xl">
            
            <p className="text-xs text-gray-400 mb-1">
              CodeBoard Status
            </p>

            <p className="text-sm font-semibold text-white h-5">
              {display}
              <span className="animate-pulse">|</span>
            </p>

            <button
              className="mt-3 w-full text-xs bg-white text-black py-1.5 rounded-lg font-medium hover:scale-105 transition"
              onClick={() => window.open("https://github.com/freakyyirus")}
            >
              View Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}