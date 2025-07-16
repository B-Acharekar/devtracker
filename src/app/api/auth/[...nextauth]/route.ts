import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.username = token.login;
      session.avatar = token.picture;
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.login = profile.login;
        token.picture = profile.avatar_url;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
