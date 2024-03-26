import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex w-full flex-col justify-center">
            <h1 className="flex w-full justify-center p-4 text-3xl">Next.js Authentication with NextAuth</h1>
            <div className="flex h-screen items-center justify-center">
                <Link href="/login" className="flex h-12 w-28 items-center justify-center rounded-md bg-purple-600 p-3 hover:bg-purple-500">
                    <p className="text-sm font-medium">Sign In</p>
                </Link>
            </div>
        </main>
    );
}

