type PinnedProjectsProps = {
  repos: {
    id: string;
    name: string;
    description: string;
    url: string;
    homepageUrl: string;
    stargazerCount: number;
    languages: { nodes: { name: string }[] };
  }[];
};

const PinnedProjects = ({ repos }: PinnedProjectsProps) => {
  if (!repos || repos.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        📌 Pinned Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow transition hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {repo.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {repo.description || 'No description provided.'}
            </p>
            <p className="text-xs text-gray-400 mb-3">
              {repo.languages.nodes.map((lang) => lang.name).join(', ') || 'No languages'}
            </p>
            <div className="flex justify-between items-center text-sm">
              <a
                href={repo.url}
                target="_blank"
                className="text-blue-500 hover:underline"
                rel="noopener noreferrer"
              >
                GitHub →
              </a>
              {repo.homepageUrl && (
                <a
                  href={repo.homepageUrl}
                  target="_blank"
                  className="text-green-500 hover:underline"
                  rel="noopener noreferrer"
                >
                  Live
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
