import { useAuth } from '@/components/authProvider';
import Layout from '@/components/layout';
import SendForm from '@/components/sendForm';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignIn(): JSX.Element {
    const { signIn } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateEmail = (value: string) => {
        setEmail(() => value);
    };

    const updatePassword = (value: string) => {
        setPassword(() => value);
    };

    const onclick = async () => {
        const succeeded = await signIn(email, password);
        if (succeeded) {
            router.push('/');
        } else {
            alert('サインインに失敗しました');
        }
    };

    return (
        <Layout>
            <Head>
                <title>サインイン</title>
            </Head>
            <div className="flex w-full max-w-5xl flex-col gap-4">
                <p className="flex w-full justify-center rounded border border-neutral-400 bg-neutral-200 p-4 text-2xl">サインイン</p>
                <SendForm updateEmail={updateEmail} updatePassword={updatePassword} onclick={onclick} />
            </div>
        </Layout>
    );
}
