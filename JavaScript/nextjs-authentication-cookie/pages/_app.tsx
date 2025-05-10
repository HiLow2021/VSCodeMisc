import { AuthProvider } from '@/components/authProvider';
import ProtectRoute from '@/components/protectRoute';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <AuthProvider>
            <ProtectRoute>
                <Component {...pageProps} />
            </ProtectRoute>
        </AuthProvider>
    );
}
