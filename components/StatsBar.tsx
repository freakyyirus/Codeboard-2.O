import { GitBranch, Star, GitCommit, Calendar } from "lucide-react";

export default function StatsBar({ 
  repoCount, 
  totalStars, 
  commitCount,
  languageCount 
}: { 
  repoCount: number;
  totalStars: number;
  commitCount: number;
  languageCount: number;
}) {
  const stats = [
    {
      label: "Repositories",
      value: repoCount,
      icon: <GitBranch className="w-5 h-5" />,
      color: "text-blue-500"
    },
    {
      label: "Total Stars",
      value: totalStars,
      icon: <Star className="w-5 h-5" />,
      color: "text-yellow-500"
    },
    {
      label: "Commits",
      value: commitCount,
      icon: <GitCommit className="w-5 h-5" />,
      color: "text-green-500"
    },
    {
      label: "Languages",
      value: languageCount,
      icon: <Calendar className="w-5 h-5" />,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#1a1a1a] mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}