import { Star, Github, ExternalLink } from "lucide-react";

export default function ProjectCard({ repo }: any) {
  return (
    <div className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl p-5 hover:border-[#2a2a2a] transition">
      <h3 className="text-lg font-semibold text-white">
        {repo.name}
      </h3>

      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
        {repo.description || "No description"}
      </p>

      <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
        {repo.language && (
          <span className="px-2 py-1 bg-[#1a1a1a] rounded">
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={14}/> {repo.stargazers_count || 0}
        </span>
      </div>

      <div className="flex gap-3 mt-5">
        <a 
          href={repo.html_url || repo.url} 
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] rounded-lg text-sm transition-colors hover:bg-[#2a2a2a]"
        >
          <Github size={16}/> Code
        </a>

        {(repo.homepage || repo.demoUrl) && (
          <a 
            href={repo.homepage || repo.demoUrl} 
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 bg-white text-black rounded-lg text-sm font-medium transition-colors hover:bg-gray-200"
          >
            <ExternalLink size={16}/> Live
          </a>
        )}
      </div>
    </div>
  );
}