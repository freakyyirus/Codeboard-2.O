import { getRepos, getPinnedRepos, getEvents } from "@/lib/github";
import { getDeployments } from "@/lib/vercel";

import DevHeader from "@/components/DevHeader";
import RepoGrid from "@/components/RepoGrid";
import ProjectCard from "@/components/ProjectCard";
import ContributionHeatmap from "@/components/ContributionHeatmap";
import LanguageChart from "@/components/LanguageChart";
import ActivityFeed from "@/components/ActivityFeed";
import DeploymentPanel from "@/components/DeploymentPanel";
import StatsBar from "@/components/StatsBar";

export default async function DevPage() {
  const repos = await getRepos();
  const pinned = await getPinnedRepos();
  const events = await getEvents();
  const deployments = await getDeployments();

  // Build language statistics
  const languageMap: any = {};
  let totalStars = 0;
  repos.forEach((r: any) => {
    if (r.language) {
      languageMap[r.language] = (languageMap[r.language] || 0) + 1;
    }
    totalStars += r.stargazers_count || 0;
  });

  const languageData = Object.keys(languageMap).map((lang) => ({
    name: lang,
    value: languageMap[lang],
  }));

  // Calculate commit count (mock for now)
  const commitCount = events.filter((e: any) => e.type === "PushEvent")
    .reduce((acc: number, event: any) => acc + (event.payload?.commits?.length || 0), 0);

  return (
    <div className="p-8 text-white space-y-8">
      <DevHeader />
      
      <StatsBar 
        repoCount={repos.length}
        totalStars={totalStars}
        commitCount={commitCount}
        languageCount={Object.keys(languageMap).length}
      />

      {/* PINNED PROJECTS */}
      <section>
        <h2 className="text-xl mb-4 text-white">Pinned Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pinned.map((repo: any) => (
            <ProjectCard 
              key={repo.name} 
              repo={{
                ...repo,
                html_url: repo.url,
                stargazers_count: repo.stargazerCount,
                language: repo.primaryLanguage?.name
              }} 
            />
          ))}
        </div>
      </section>

      {/* STATS CHARTS */}
      <section className="grid md:grid-cols-2 gap-8">
        <ContributionHeatmap username="freakyyirus" />
        <LanguageChart data={languageData} />
      </section>

      {/* DEPLOYMENTS */}
      <DeploymentPanel deployments={deployments} />

      {/* ACTIVITY FEED */}
      <ActivityFeed events={events} />

      {/* ALL REPOSITORIES */}
      <RepoGrid repos={repos} title="All Projects" />
    </div>
  );
}