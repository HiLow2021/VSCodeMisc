'use client';

import { authenticate } from '@/shared/auth/auth.action';
import { LoginFormInput } from '@/shared/types/loginFormInput';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function Login() {
    const { register, handleSubmit } = useForm<LoginFormInput>();
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
        const result = await authenticate(data);
        setErrorMessage(result as string);
    };

    return (
        <main className="flex h-screen w-full flex-col items-center justify-center">
            <h1 className="mb-12 flex w-full justify-center p-4 text-3xl">Sign In</h1>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                        className="h-8 w-72 bg-neutral-700 p-2"
                        type="email"
                        {...register('email', {
                            required: true,
                            pattern: /\S+@\S+\.\S+/
                        })}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input className="h-8 w-72 bg-neutral-700 p-2" type="password" {...register('password', { required: true })} />
                </div>
                <button className="mt-8 h-12 rounded-md bg-purple-600 hover:bg-purple-500" type="submit">
                    SIGN IN
                </button>
                <p className="mt-2 flex justify-center text-red-500">{errorMessage}</p>
            </form>
        </main>
    );
}
