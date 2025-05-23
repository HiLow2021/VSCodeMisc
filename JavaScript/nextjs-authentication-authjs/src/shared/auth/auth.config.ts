import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnPrivate = nextUrl.pathname.startsWith('/private');
            if (isOnPrivate) {
                if (isLoggedIn) {
                    return true;
                }

                // Redirect unauthenticated users to login page
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/private', nextUrl));
            }

            return true;
        }
    },
    providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
