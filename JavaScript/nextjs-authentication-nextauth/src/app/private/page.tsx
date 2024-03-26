import { signOut } from '@/shared/auth/auth';

export default function Private() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center">
            <h1 className="mb-12 flex w-full justify-center p-4 text-center text-3xl">
                Congratulations ! 🎉
                <br />
                you are in private page
            </h1>
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <button
                    className="mt-8 flex h-12 items-center justify-center rounded-md bg-purple-600 p-4 hover:bg-purple-500"
                    type="submit"
                >
                    SING OUT
                </button>
            </form>
        </main>
    );
}
