'use server';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

const correctEmail = '';
const correctPassword = '';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials;

                const isMatched = email === correctEmail && password === correctPassword;
                if (isMatched) {
                    return {};
                }

                console.log('Invalid credentials');

                return null;
            }
        })
    ]
});
