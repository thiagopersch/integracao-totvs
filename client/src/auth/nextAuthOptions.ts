import axios from 'axios';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials: any) {
        try {
          const res = await axios.post(
            `${process.env.API_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            },
            { withCredentials: true },
          );

          if (res.data.data && res.data.data.user) {
            return {
              id: res.data.data.user.id,
              name: res.data.data.user.name,
              email: res.data.data.user.email,
              token: res.data.data.token,
            };
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.token = token.token;
      session.user = token.user as User;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
