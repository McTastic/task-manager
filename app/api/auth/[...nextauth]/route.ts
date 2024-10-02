import NextAuth from 'next-auth';
import { authOptions } from './authOptions';

// This is the main handler function
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };