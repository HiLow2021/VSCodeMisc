'use client';

import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function Stream() {
    const [query, setQuery] = useState('query');
    const [messages, setMessages] = useState<string[]>([]);
    const [isStreaming, setIsStreaming] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);

    const handleStream = () => {
        if (isStreaming) {
            eventSourceRef.current?.close();
            setIsStreaming(false);
            return;
        }

        setIsStreaming(true);
        const eventSource = new EventSource(`/api/stream?query=${query}`);
        eventSourceRef.current = eventSource;

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [...prev, data.message]);
        };

        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
            setIsStreaming(false);
        };
    };

    useEffect(() => {
        return () => {
            eventSourceRef.current?.close();
        };
    }, []);

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
                <h1 className="flex w-full justify-center p-2 lg:p-4">Stream Page</h1>
                <div className="flex flex-col justify-center gap-4 pb-8">
                    <div className="flex w-full justify-center gap-4">
                        <Button className="w-40" variant="contained" component="span" onClick={handleStream}>
                            {isStreaming ? 'ストーリム停止' : 'ストリーム開始'}
                        </Button>
                        <Button className="w-40" variant="contained" component="span" onClick={() => setMessages([])}>
                            クリア
                        </Button>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 text-center text-xl">クエリ</span>
                        <TextField fullWidth variant="outlined" value={query} onChange={(e) => setQuery(e.target.value)} />
                    </div>
                    <TextField
                        className="h-[512px] w-full"
                        multiline
                        fullWidth
                        variant="outlined"
                        rows={20}
                        InputProps={{
                            readOnly: true
                        }}
                        value={messages.join('\n')}
                    />
                </div>
            </div>
        </main>
    );
}
