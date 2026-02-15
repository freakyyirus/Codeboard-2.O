import { Github, Calendar, BarChart3, Activity } from "lucide-react";

export default function DevHeader() {
  return (
    <div className="bg-gradient-to-r from-[#0f0f0f] via-[#1a1a2e] to-[#16213e] border border-[#1f1f1f] rounded-2xl p-8 mb-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {/* Brand Logo */}
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <div className="text-2xl font-bold text-white bg-black bg-opacity-30 px-2 py-1 rounded-lg backdrop-blur-sm">
                CB
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#0f0f0f] animate-pulse"></div>
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              ONE DASHBOARD FOR ALL
            </h1>
            <p className="text-gray-400 text-lg">
              GitHub, deployments, analytics & projects in one place.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
            <Github className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-green-400 font-medium">Connected</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]">
            <Activity className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-green-400 font-medium">Live</span>
          </div>
        </div>
      </div>
      
      {/* Animated underline effect */}
      <div className="mt-6 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
    </div>
  );
}