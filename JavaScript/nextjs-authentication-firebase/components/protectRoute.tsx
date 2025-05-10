import { useRouter } from 'next/router';
import { useAuth } from './authProvider';

const ProtectRoute = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { isSignedIn, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <Loading />;
    }
    if (!isSignedIn && router.pathname === '/private') {
        router.push('/signIn');
    }

    return children;
};

export default ProtectRoute;

const Loading = (): JSX.Element => {
    return <></>;
};
