import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/style/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next.js Authentication with NextAuth',
    description: 'Next.js Authentication with NextAuth'
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
