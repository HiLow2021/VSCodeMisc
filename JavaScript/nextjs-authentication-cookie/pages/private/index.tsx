import Layout from '@/components/layout';
import Head from 'next/head';

export default function Private(): JSX.Element {
    const message = 'Hello Secret';

    return (
        <Layout>
            <Head>
                <title>プライベート</title>
            </Head>
            <div className="w-full max-w-5xl">
                <p className="flex w-full justify-center rounded border border-neutral-400 bg-neutral-200 p-4 text-2xl">{message}</p>
            </div>
        </Layout>
    );
}
