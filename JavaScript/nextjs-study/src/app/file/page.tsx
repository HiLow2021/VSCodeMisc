'use client';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button } from '@mui/material';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export default function FormSelect() {
    return (
        <main className="flex w-full justify-center">
            <SnackbarProvider />
            <div className="flex w-full max-w-5xl flex-col gap-4 text-3xl">
                <h1 className="flex justify-center p-2 lg:p-4">File Page</h1>
                <div className="flex flex-col items-center gap-4">
                    <Button
                        className="w-40"
                        variant="contained"
                        component="span"
                        startIcon={<FileDownloadIcon />}
                        onClick={async () => {
                            const response = await fetch('api/download');

                            if (response.ok) {
                                const blob = await response.blob();

                                const link = document.createElement('a');
                                link.href = window.URL.createObjectURL(blob);
                                link.setAttribute('download', 'download.png');
                                link.click();
                                link.remove();

                                enqueueSnackbar('ダウンロードに成功しました', { variant: 'success' });
                            } else {
                                enqueueSnackbar('ダウンロードに失敗しました', { variant: 'error' });
                            }
                        }}
                    >
                        ダウンロード
                    </Button>
                    <label htmlFor="upload-button">
                        <input
                            id="upload-button"
                            accept="image/png"
                            style={{ display: 'none' }}
                            type="file"
                            onChange={async (e) => {
                                const { files } = e.target;
                                if (files && files.length > 0) {
                                    const file = files[0];
                                    const blob = new Blob([file], { type: file.type });

                                    const response = await fetch('api/upload', {
                                        method: 'POST',
                                        body: blob
                                    });

                                    if (response.ok) {
                                        enqueueSnackbar('アップロードに成功しました', { variant: 'success' });
                                    } else {
                                        enqueueSnackbar('アップロードに失敗しました', { variant: 'error' });
                                    }
                                }

                                e.target.value = '';
                            }}
                        />
                        <Button className="w-40" variant="contained" component="span" startIcon={<FileUploadIcon />}>
                            アップロード
                        </Button>
                    </label>
                </div>
            </div>
        </main>
    );
}
