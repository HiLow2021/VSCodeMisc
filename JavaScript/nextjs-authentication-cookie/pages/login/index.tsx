import { useAuth } from '@/components/authProvider';
import Layout from '@/components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login(): JSX.Element {
    const { login } = useAuth();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const updateUsername = (value: string) => {
        setUsername(() => value);
    };

    const updatePassword = (value: string) => {
        setPassword(() => value);
    };

    const handleClick = async () => {
        const succeeded = await login(username, password);
        if (succeeded) {
            router.push('/');
        } else {
            alert('ログインに失敗しました');
        }
    };

    return (
        <Layout>
            <Head>
                <title>ログイン</title>
            </Head>
            <div className="flex w-full max-w-5xl flex-col gap-4">
                <p className="flex w-full justify-center rounded border border-neutral-400 bg-neutral-200 p-4 text-2xl">ログイン</p>
                <div className="flex flex-col gap-6 px-24 pt-8">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b border-neutral-500 bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-green-500 focus:outline-0 disabled:border-0"
                            placeholder=" "
                            onChange={(e) => updateUsername(e.target.value)}
                        />
                        <label className="after:content[' '] text-blue-gray-500 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent">
                            名前
                        </label>
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            className="text-blue-gray-700 placeholder-shown:border-blue-gray-200 disabled:bg-blue-gray-50 peer h-full w-full border-b border-neutral-500 bg-transparent pb-1.5 pt-4 font-sans text-sm font-normal outline outline-0 transition-all focus:border-green-500 focus:outline-0 disabled:border-0"
                            type="password"
                            placeholder=" "
                            onChange={(e) => updatePassword(e.target.value)}
                        />
                        <label className="after:content[' '] text-blue-gray-500 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-green-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:after:scale-x-100 peer-focus:after:border-green-500 peer-disabled:text-transparent">
                            パスワード
                        </label>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button className="w-32 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-500" onClick={handleClick}>
                            送信
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
