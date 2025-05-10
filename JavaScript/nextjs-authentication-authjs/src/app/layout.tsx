import '@/style/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next.js Authentication with Auth.js',
    description: 'Next.js Authentication with Auth.js'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <div className="flex h-screen w-full justify-center bg-neutral-900 p-4 text-neutral-100">{children}</div>
            </body>
        </html>
    );
}
