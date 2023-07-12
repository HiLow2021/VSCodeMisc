import { Layout } from '@/components/layout';
import Head from 'next/head';

export default function Private() {
    const message = 'Private Page';

    return (
        <Layout>
            <Head>
                <title>プライベート</title>
            </Head>
            <div className="w-full max-w-5xl">
                <p className="flex w-full justify-center text-2xl rounded-xl border border-neutral-400 bg-neutral-200 p-4">{message}</p>
            </div>
        </Layout>
    );
}
