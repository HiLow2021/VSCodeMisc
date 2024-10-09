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
        <pre className="mermaid">
            {`
            graph TD
            A[Client] --> B[Load Balancer]
            B --> C[Server01]
            B --> D[Server02]`}
        </pre>
    );
}
