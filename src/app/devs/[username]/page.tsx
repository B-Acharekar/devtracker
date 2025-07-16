import { notFound } from 'next/navigation';
import PinnedProjects from '@/components/PinnedProjects';

type Repo = {
  id: string;
  name: string;
  description: string;
  url: string;
  homepageUrl: string;
  stargazerCount: number;
  languages: {
    nodes: { name: string }[];
  };
};

export default async function PublicUserPage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  // Fetch GitHub user profile
  const userRes = await fetch(`https://api.github.com/users/${username}`);
  if (!userRes.ok) return notFound();
  const user = await userRes.json();

  // Fetch pinned repos (via your own /api/pinned route)
  const reposRes = await fetch(
    `${process.env.NEXTAUTH_URL}/api/pinned?username=${username}`,
    { cache: 'no-store' }
  );

  const repos: Repo[] = await reposRes.json();

  return (
    <main className="min-h-screen px-4 sm:px-6 py-10 max-w-5xl mx-auto text-gray-900 dark:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={`${user.login} avatar`}
            className="w-20 h-20 rounded-full shadow-lg border dark:border-gray-700"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              {user.bio || 'No bio available'}
            </p>
          </div>
        </div>
        <a
          href={user.html_url}
          target="_blank"
          className="text-sm bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          View on GitHub →
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <StatCard title="Public Repos" value={user.public_repos} />
        <StatCard title="Followers" value={user.followers} />
        <StatCard title="Following" value={user.following} />
      </div>

      {/* Pinned Projects */}
      <PinnedProjects repos={repos} />
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow text-center">
      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
