import ProjectCard from "./ProjectCard";

export default function RepoGrid({ 
  repos, 
  title 
}: { 
  repos: any[]; 
  title: string;
}) {
  if (!repos || repos.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-xl mb-4 text-white">{title}</h2>
        <div className="text-gray-500 text-center py-8 bg-[#0f0f0f] border border-[#1f1f1f] rounded-2xl">
          No repositories found
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-xl mb-4 text-white">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo: any) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}