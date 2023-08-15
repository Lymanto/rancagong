import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/admin',
  },
  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Logged in',
        };
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('session callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log('jwt callback', { token, user });
      const u = user as unknown as any;
      if (user) {
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
