'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import MindElixir, { MindElixirInstance } from 'mind-elixir';
import { useEffect, useRef, useState } from 'react';

export default function Mindmap() {
    const [mounted, setMounted] = useState(false);

    const mindRef = useRef<MindElixirInstance>();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const element = document.getElementById('map');
        if (!element) {
            return;
        }

        const mind = new MindElixir({
            el: element,
            direction: MindElixir.RIGHT,
            draggable: true,
            contextMenu: true,
            toolBar: true,
            nodeMenu: true,
            keypress: true,
            locale: 'en',
            overflowHidden: false,
            mouseSelectionButton: 0,
            contextMenuOption: {
                focus: true,
                link: false
            },
            before: {
                insertSibling() {
                    return true;
                },
                async addChild() {
                    await new Promise((resolve) => setTimeout(resolve, 200));
                    return true;
                }
            }
        });

        const data = MindElixir.new('topic');

        mind.init(data);
        mindRef.current = mind;
    }, [mounted]);

    if (!mounted) {
        return <></>;
    }

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
                <h1 className="flex w-full justify-center p-2 lg:p-4">Mindmap Page</h1>
                <div className="flex justify-center">
                    <div id="map" className="h-[500px] w-full" />
                </div>
                <div className="flex justify-center pb-8">
                    <Button
                        className="w-40"
                        variant="contained"
                        component="span"
                        startIcon={<FileDownloadIcon />}
                        onClick={async () => {
                            if (mindRef.current) {
                                const blob = await mindRef.current.exportPng();
                                if (blob) {
                                    const url = URL.createObjectURL(blob);

                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = 'mindmap.png';
                                    link.click();
                                    URL.revokeObjectURL(url);
                                }
                            }
                        }}
                    >
                        ダウンロード
                    </Button>
                </div>
            </div>
        </main>
    );
}
