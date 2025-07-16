'use client';

import { signIn } from 'next-auth/react';

const Hero = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
        Welcome to <span className="text-blue-600 dark:text-blue-400">DevTracker</span>
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mb-6">
        Track your GitHub profile, pinned projects, commits, and more — powered by Next.js and GitHub APIs.
      </p>
      <button
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Login with GitHub
      </button>
    </section>
  );
};

export default Hero;
