// src/types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    username?: string;
    avatar?: string;
  }

  interface Profile {
    login?: string;
    avatar_url?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    login?: string;
    picture?: string;
  }
}
