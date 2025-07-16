'use client';

import { useEffect, useState } from 'react';

type Repo = {
  id: string;
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  languages: {
    nodes: { name: string }[];
  };
};

const PinnedProjects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    const fetchPinned = async () => {
      const res = await fetch('/api/pinned');
      const data = await res.json();
      setRepos(data);
    };

    fetchPinned();
  }, []);

  return (
    <section className="px-6 py-12 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">📌 Pinned Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div key={repo.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{repo.description}</p>
            <div className="text-sm mb-2">
              <span className="font-semibold">Languages:</span>{' '}
              {repo.languages.nodes.map((lang) => lang.name).join(', ') || 'N/A'}
            </div>
            <div className="flex justify-between mt-4">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub →
              </a>
              {repo.homepageUrl && (
                <a
                  href={repo.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PinnedProjects;
