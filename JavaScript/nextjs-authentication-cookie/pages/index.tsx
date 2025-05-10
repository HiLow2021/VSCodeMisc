import { useAuth } from '@/components/authProvider';
import Layout from '@/components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const message = isAuthenticated ? `Hello ${user}` : 'Hello Guest';

    const gotoPrivate = async () => {
        await router.push('/private');
    };

    return (
        <Layout>
            <Head>
                <title>トップ</title>
            </Head>
            <div className="w-full max-w-5xl">
                <p className="flex w-full justify-center rounded border border-neutral-400 bg-neutral-200 p-4 text-2xl">{message}</p>
                {isAuthenticated ? (
                    <div className="flex justify-center p-8">
                        <button className="w-48 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500" onClick={gotoPrivate}>
                            プライベートページへ
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </Layout>
    );
}
