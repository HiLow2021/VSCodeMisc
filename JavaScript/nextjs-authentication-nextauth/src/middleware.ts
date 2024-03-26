// Use the file middleware.ts (or .js) in the root of your project to define Middleware. 
// For example, at the same level as pages or app, or inside src if applicable. 

import NextAuth from 'next-auth';
import { authConfig } from './authConfig';

export default NextAuth(authConfig).auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};
