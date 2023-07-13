import { useRouter } from 'next/router';
import { useAuth } from './authProvider';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const { isSignedIn, signOut } = useAuth();

    const router = useRouter();

    const gotoTop = async () => {
        await router.push('/');
    };

    const gotoSignIn = async () => {
        await router.push('/signIn');
    };

    const gotoSignUp = async () => {
        await router.push('/signUp');
    };

    const clickSignOut = async () => {
        await signOut();
        await router.push('/');
    };

    return (
        <>
            <header className="flex justify-between p-4">
                <div>
                    {router.pathname === '/' ? (
                        <></>
                    ) : (
                        <button className="bg-neutral-500 hover:bg-neutral-400 text-white rounded w-32 px-4 py-2" onClick={gotoTop}>
                            トップ
                        </button>
                    )}
                </div>
                <div>
                    {isSignedIn ? (
                        <button className="bg-green-600 hover:bg-green-500 text-white rounded w-32 px-4 py-2" onClick={clickSignOut}>
                            サインアウト
                        </button>
                    ) : (
                        <div className="flex gap-4">
                            {router.pathname === '/signIn' ? (
                                <></>
                            ) : (
                                <button className="bg-green-600 hover:bg-green-500 text-white rounded w-32 px-4 py-2" onClick={gotoSignIn}>
                                    サインイン
                                </button>
                            )}
                            {router.pathname === '/signUp' ? (
                                <></>
                            ) : (
                                <button className="bg-green-600 hover:bg-green-500 text-white rounded w-32 px-4 py-2" onClick={gotoSignUp}>
                                    サインアップ
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>
            <main className="flex min-h-screen justify-center px-4 py-2">{children}</main>
        </>
    );
};

export default Layout;
