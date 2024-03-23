import '@/style/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SideNavigation from './components/sideNavigation';
import { Site } from './const/site';

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
                    <div className="flex flex-grow flex-col items-center justify-between p-4 md:overflow-y-auto">{children}</div>
                </div>
            </body>
        </html>
    );
}
