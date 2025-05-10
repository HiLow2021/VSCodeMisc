'use client';

import CloseIcon from '@mui/icons-material/Close';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { Button, CircularProgress, Dialog, DialogContent, IconButton } from '@mui/material';
import { SnackbarProvider, closeSnackbar, enqueueSnackbar } from 'notistack';
import { useState } from 'react';

export default function FormSelect() {
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [open, setOpen] = useState(false);

    return (
        <main className="flex w-full justify-center">
            <SnackbarProvider
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                action={(snackbarKey) => (
                    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
                        <CloseIcon className="text-white" />
                    </IconButton>
                )}
            />
            <div className="flex w-full max-w-5xl flex-col gap-8 text-3xl">
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
                    <label>
                        <input
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
                <hr className="w-full border-b-[1px] border-neutral-400" />
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                        <label>
                            <input
                                accept="image/png"
                                style={{ display: 'none' }}
                                type="file"
                                onChange={async (e) => {
                                    const { files } = e.target;
                                    if (files && files.length > 0) {
                                        setSelectedFile(files[0]);
                                    }

                                    e.target.value = '';
                                }}
                            />
                            <Button className="h-10 w-40" variant="contained" component="span" startIcon={<InsertPhotoIcon />}>
                                <div className=" truncate">{selectedFile ? selectedFile.name : 'ファイルを選択'}</div>
                            </Button>
                        </label>
                        <Button
                            className="h-10 w-24"
                            variant="contained"
                            component="span"
                            startIcon={<FileUploadIcon />}
                            onClick={async () => {
                                if (selectedFile) {
                                    setOpen(true);

                                    await new Promise((resolve) => setTimeout(resolve, 5000));

                                    const blob = new Blob([selectedFile], { type: selectedFile.type });

                                    const response = await fetch('api/upload', {
                                        method: 'POST',
                                        body: blob
                                    });

                                    if (response.ok) {
                                        enqueueSnackbar('アップロードに成功しました', { variant: 'success' });
                                    } else {
                                        enqueueSnackbar('アップロードに失敗しました', { variant: 'error' });
                                    }
                                } else {
                                    enqueueSnackbar('ファイルが未選択です', { variant: 'warning' });
                                }

                                setOpen(false);
                            }}
                        >
                            送信
                        </Button>
                        <Dialog
                            open={open}
                            PaperProps={{
                                style: {
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            <DialogContent>
                                <CircularProgress />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </main>
    );
}
