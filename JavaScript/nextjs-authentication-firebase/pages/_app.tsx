import { AuthProvider } from '@/components/authProvider';
import ProtectRoute from '@/components/protectRoute';
import { firebaseConfig } from '@/config/firebase';
import { initializeApp } from 'firebase/app';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    initializeApp(firebaseConfig);

    return (
        <AuthProvider>
            <ProtectRoute>
                <Component {...pageProps} />
            </ProtectRoute>
        </AuthProvider>
    );
}
