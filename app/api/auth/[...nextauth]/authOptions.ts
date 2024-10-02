import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions ={
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try{
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }, 
        });

        console.log('User found >>', user);

        if (user && user.password === credentials?.password) { 
          console.log('Auth Success!!');
          return user;
        }else{
            console.error('Auth Failed. User not found or password incorrect');
        return null;
        }
      }
        catch (error) {
            console.error("Error during authorization",error);
            return null;
        }
        }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
  ],
  pages: {
    signIn: '/', 
  }
};