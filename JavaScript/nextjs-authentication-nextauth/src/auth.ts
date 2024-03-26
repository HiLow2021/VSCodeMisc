import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './authConfig';

const correctEmail = 'admin@test.com';
const correctPassword = 'password';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials;

                const isMatched = email === correctEmail && password === correctPassword;
                if (isMatched) {
                    return {
                        name: 'Admin',
                        email: email
                    };
                }

                console.log('Invalid credentials');

                return null;
            }
        })
    ]
});
