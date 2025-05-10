'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button, TextField } from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';

ChartJS.register(...registerables);

export default function Chart() {
    const [mounted, setMounted] = useState(false);

    const [title, setTitle] = useState<string>('Title');
    const [labels, setLabels] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    const [data, setData] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('chart') as HTMLCanvasElement;
        if (canvas) {
            const chart = new ChartJS(canvas, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [
                        {
                            label: title,
                            data,
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    animation: {
                        delay: 3000
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            return () => chart.destroy();
        }
    }, [mounted, title, labels, data]);

    if (!mounted) {
        return <></>;
    }

    return (
        <main className="flex w-full justify-center">
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
                <h1 className="flex w-full justify-center p-2 lg:p-4">Chart Page</h1>
                <div className="flex h-full w-full justify-center">
                    <canvas id="chart" />
                </div>
                <div className="flex flex-col gap-4 p-4">
                    <TextField
                        label="Title"
                        variant="outlined"
                        defaultValue={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <TextField
                        label="Label"
                        variant="outlined"
                        defaultValue={labels.join(',')}
                        onChange={(e) => {
                            setLabels(e.target.value.split(','));
                        }}
                    />
                    <TextField
                        label="Data"
                        variant="outlined"
                        defaultValue={data.join(',')}
                        onChange={(e) => {
                            setData(e.target.value.split(',').map((value) => parseInt(value)));
                        }}
                    />
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
