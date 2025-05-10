import { useRouter } from 'next/router';
import { useAuth } from './authProvider';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const { isAuthenticated, logout } = useAuth();

    const router = useRouter();

    const gotoTop = async () => {
        await router.push('/');
    };

    const gotoLogin = async () => {
        await router.push('/login');
    };

    const clickLogout = async () => {
        await logout();
        await router.push('/');
    };

    return (
        <>
            <header className="flex justify-between p-4">
                <div>
                    {router.pathname === '/' ? (
                        <></>
                    ) : (
                        <button className="w-32 rounded bg-neutral-500 px-4 py-2 text-white hover:bg-neutral-400" onClick={gotoTop}>
                            トップ
                        </button>
                    )}
                </div>
                <div>
                    {router.pathname === '/login' ? (
                        <></>
                    ) : isAuthenticated ? (
                        <button className="w-32 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500" onClick={clickLogout}>
                            ログアウト
                        </button>
                    ) : (
                        <button className="w-32 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500" onClick={gotoLogin}>
                            ログイン
                        </button>
                    )}
                </div>
            </header>
            <main className="flex min-h-screen justify-center px-4 py-2">{children}</main>
        </>
    );
};

export default Layout;
