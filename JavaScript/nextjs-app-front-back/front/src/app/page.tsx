'use client';

import { useState } from 'react';

export default function Home() {
    const [message, setMessage] = useState('Click');

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:5000/api', {
                method: 'GET'
            });
            const { message } = await response.json();

            setMessage(message);
        } catch (error) {
            console.error('Error has occurred:', error);
            setMessage('Error');
        }
    };

    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
            <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                <button className="w-32 rounded-full bg-black px-4 py-2 text-xl text-white hover:bg-gray-700" onClick={handleClick}>
                    {message}
                </button>
            </main>
        </div>
    );
}
