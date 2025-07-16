'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

type GitHubStats = {
  public_repos: number;
  followers: number;
  following: number;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      if (!session?.username) return;

      const res = await fetch(`https://api.github.com/users/${session.username}`);
      const data = await res.json();
      setStats({
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
      });
    };

    fetchGitHubStats();
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Please log in to view your dashboard.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={session.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold">{session.username}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{session.user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Public Repos" value={stats?.public_repos ?? '--'} />
          <StatCard title="Followers" value={stats?.followers ?? '--'} />
          <StatCard title="Following" value={stats?.following ?? '--'} />
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
