import { useAuth } from '@/components/authProvider';
import Layout from '@/components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home(): JSX.Element {
    const { user, isSignedIn } = useAuth();
    const router = useRouter();

    const message = isSignedIn ? `Hello ${user?.email}` : 'Hello Guest';

    const gotoPrivate = async () => {
        await router.push('/private');
    };

    return (
        <Layout>
            <Head>
                <title>トップ</title>
            </Head>
            <div className="w-full max-w-5xl">
                <p className="flex w-full justify-center text-2xl rounded border border-neutral-400 bg-neutral-200 p-4">{message}</p>
                {isSignedIn ? (
                    <div className="flex justify-center p-8">
                        <button className="bg-green-600 hover:bg-green-500 text-white rounded w-48 px-4 py-2" onClick={gotoPrivate}>
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