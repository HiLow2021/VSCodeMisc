import { User, createUserWithEmailAndPassword, signOut as firebaseSignOut, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextProps = {
    user: User | null;
    isSignedIn: boolean;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<boolean>;
    signUp: (email: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({
    user: null,
    isSignedIn: false,
    loading: true,
    signIn: () => new Promise(() => {}),
    signUp: () => new Promise(() => {}),
    signOut: () => new Promise(() => {})
});

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const auth = getAuth();

    const signIn = async (email: string, password: string): Promise<boolean> => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    const signUp = async (email: string, password: string): Promise<boolean> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    const signOut = async (): Promise<void> => {
        await firebaseSignOut(auth);
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ user, isSignedIn: !!user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
    return useContext(AuthContext);
};
