import { Site } from '@/shared/const/site';
import '@/style/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SideNavigation from './components/side-navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: Site.title,
    description: Site.title
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={inter.className}>
                <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                    <div className="w-full flex-none md:w-64 ">
                        <SideNavigation />
                    </div>
                    <div className="flex w-full justify-center p-4 md:overflow-y-auto">{children}</div>
                </div>
            </body>
        </html>
    );
}
