import { Code, BookOpen, Trophy, TrendingUp, Clock, Target } from "lucide-react";

export default function DSAPage() {
  const practiceAreas = [
    {
      title: "Data Structures",
      icon: <Code className="w-6 h-6" />,
      description: "Arrays, Linked Lists, Trees, Graphs, Hash Tables",
      progress: 65,
      color: "bg-blue-500"
    },
    {
      title: "Algorithms",
      icon: <TrendingUp className="w-6 h-6" />,
      description: "Sorting, Searching, Dynamic Programming, Greedy",
      progress: 42,
      color: "bg-green-500"
    },
    {
      title: "Problem Solving",
      icon: <Target className="w-6 h-6" />,
      description: "LeetCode, Codeforces, HackerRank problems",
      progress: 78,
      color: "bg-purple-500"
    }
  ];

  const quickStats = [
    {
      label: "Problems Solved",
      value: "127",
      change: "+12 this week",
      icon: <Trophy className="w-5 h-5 text-yellow-500" />
    },
    {
      label: "Current Streak",
      value: "15 days",
      change: "Keep it up!",
      icon: <Clock className="w-5 h-5 text-green-500" />
    },
    {
      label: "Accuracy",
      value: "84%",
      change: "↑ 3% from last week",
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-400" />
            DSA Practice
          </h1>
          <p className="text-gray-400">
            Master Data Structures and Algorithms with hands-on practice
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Practice Areas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Practice Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {practiceAreas.map((area, index) => (
              <div 
                key={index} 
                className="bg-[#0f0f0f] border border-[#1f1f1f] hover:border-[#2a2a2a] rounded-2xl p-6 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#1a1a1a] rounded-lg">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{area.title}</h3>
                </div>
                
                <p className="text-gray-400 text-sm mb-6">
                  {area.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{area.progress}%</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${area.color}`} 
                      style={{ width: `${area.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Daily Challenge</h3>
            <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-medium">Easy</span>
                <span className="text-gray-500">Arrays</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Two Sum</h4>
              <p className="text-gray-400 text-sm">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium transition-colors">
              Start Challenge
            </button>
          </div>

          <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4">Practice Problems</h3>
            <div className="space-y-3">
              {[
                { name: "Binary Search", difficulty: "Medium", platform: "LeetCode" },
                { name: "Merge Sort", difficulty: "Medium", platform: "Codeforces" },
                { name: "BFS Traversal", difficulty: "Hard", platform: "HackerRank" }
              ].map((problem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <h4 className="font-medium text-white">{problem.name}</h4>
                    <p className="text-xs text-gray-500">{problem.platform}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    problem.difficulty === 'Easy' ? 'bg-green-900/30 text-green-400' :
                    problem.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] py-3 rounded-lg font-medium transition-colors">
              View All Problems
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}