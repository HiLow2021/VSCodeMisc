import Map from './components/map';

export default function Home() {
    return (
        <div className="flex justify-center">
            <div className="min-h-screen w-full max-w-5xl justify-center p-10">
                <main className="flex flex-col items-center justify-center gap-10">
                    <h1 className=" text-4xl">D3.js with Next.js</h1>
                    <Map />
                </main>
            </div>
        </div>
    );
}

