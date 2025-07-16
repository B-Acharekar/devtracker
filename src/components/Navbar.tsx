'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md">
      <Link href="/">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">DevTracker</h1>
      </Link>

      <div>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Login with GitHub
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
