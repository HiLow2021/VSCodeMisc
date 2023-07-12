import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextProps = {
    user: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (name: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({
    user: null,
    isAuthenticated: false,
    loading: true,
    login: () => new Promise(() => {}),
    logout: () => new Promise(() => {})
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async (): Promise<void> => {
        const { data } = await axios.get('/api/user');
        const { user } = data as { user: string };
        if (user) {
            setUser(user);
        }
    };

    const login = async (name: string, password: string): Promise<boolean> => {
        try {
            await axios.post('/api/login', { name, password });
            await loadUser();

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    };

    const logout = async (): Promise<void> => {
        await axios.post('/api/logout');
        setUser(null);
    };

    useEffect(() => {
        (async function () {
            await loadUser();
            setLoading(false);
        })();
    }, []);

    return <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
