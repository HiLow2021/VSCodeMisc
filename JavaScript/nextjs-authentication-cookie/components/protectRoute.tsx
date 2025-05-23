import { useRouter } from 'next/router';
import { useAuth } from './authProvider';

const ProtectRoute = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <Loading />;
    }
    if (!isAuthenticated && router.pathname === '/private') {
        router.push('/login');
    }

    return children;
};

export default ProtectRoute;

const Loading = (): JSX.Element => {
    return <></>;
};
