import { GitCommit, Star, GitFork, GitBranch, User } from "lucide-react";
import { format } from "date-fns";

export default function ActivityFeed({ events }: { events: any[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="text-gray-500 text-center py-8">
          No recent activity found
        </div>
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "WatchEvent": return <Star className="w-4 h-4 text-yellow-500" />;
      case "ForkEvent": return <GitFork className="w-4 h-4 text-blue-500" />;
      case "PushEvent": return <GitCommit className="w-4 h-4 text-green-500" />;
      case "CreateEvent": return <GitBranch className="w-4 h-4 text-purple-500" />;
      default: return <User className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEventMessage = (event: any) => {
    const repo = event.repo?.name;
    const type = event.type;
    
    switch (type) {
      case "WatchEvent":
        return `Starred ${repo}`;
      case "ForkEvent":
        return `Forked ${repo}`;
      case "PushEvent":
        const commits = event.payload?.commits?.length || 0;
        return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repo}`;
      case "CreateEvent":
        return `Created ${event.payload?.ref_type} in ${repo}`;
      default:
        return `Activity in ${repo}`;
    }
  };

  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {events.slice(0, 10).map((event: any, index: number) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg">
            <div className="mt-1">
              {getEventIcon(event.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 truncate">
                {getEventMessage(event)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {format(new Date(event.created_at), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}