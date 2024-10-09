'use client';

import mermaid from 'mermaid';
import { useEffect, useState } from 'react';

export default function Diagram() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        mermaid.contentLoaded();
    }, [mounted]);

    if (!mounted) {
        return <></>;
    }

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
                <h1 className="flex w-full justify-center p-2 lg:p-4">Diagram Page</h1>
                <div className="flex flex-col items-center gap-8">
                    <pre className="mermaid flex w-full justify-center">
                        {`
                        graph TD
                        A[Client] --> B[Load Balancer]
                        B --> C[Server01]
                        B --> D[Server02]`}
                    </pre>
                    <pre className="mermaid flex w-full justify-center">
                        {`
                        xychart-beta
                        title "Sales Revenue"
                        x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
                        y-axis "Revenue (in $)" 4000 --> 11000
                        bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
                        line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]`}
                    </pre>
                </div>
            </div>
        </main>
    );
}
