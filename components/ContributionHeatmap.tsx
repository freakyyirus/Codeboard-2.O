"use client";
import { GitHubCalendar } from "react-github-calendar";

export default function ContributionHeatmap({ username }: { username: string }) {
  if (!username) {
    return (
      <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-white">Contribution Heatmap</h3>
        <p className="text-gray-500">GitHub username not configured</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-6 text-white">Contribution Heatmap</h3>
      <div className="overflow-x-auto">
        <GitHubCalendar
          username={username}
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          theme={{
            light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
          }}
        />
      </div>
    </div>
  );
}