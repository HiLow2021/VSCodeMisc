'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';

Chart.register(...registerables);

export default function Diagram() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('chart') as HTMLCanvasElement;
        if (canvas) {
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [
                        {
                            label: 'Title',
                            data: [12, 19, 3, 5, 2, 3],
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [mounted]);

    if (!mounted) {
        return <></>;
    }

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
                <h1 className="flex w-full justify-center p-2 lg:p-4">Chart Page</h1>
                <div className="flex justify-center" style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <canvas id="chart" />
                </div>
                <div className="flex justify-center pb-8">
                    <Button
                        className="w-40"
                        variant="contained"
                        component="span"
                        startIcon={<FileDownloadIcon />}
                        onClick={async () => {
                            const element = document.querySelector('#chart');
                            if (element) {
                                const canvas = await html2canvas(element as HTMLElement, { backgroundColor: null });
                                const image = canvas.toDataURL('image/png');

                                const link = document.createElement('a');
                                link.href = image;
                                link.download = 'chart.png';
                                link.click();
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
