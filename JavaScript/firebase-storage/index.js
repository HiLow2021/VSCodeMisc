import * as dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

dotenv.config();

const localDirectory = './media/';
const storageDirectory = 'sample/';
const downloadFileName = 'download.png';
const uploadFileName = 'upload.png';

initializeApp({
    credential: cert(process.env.FIREBASE_CREDENTIALS),
    storageBucket: process.env.STORAGE_BUCKET
});
const bucket = getStorage().bucket();

(async () => {
    await download();
    await upload();
})();

async function download() {
    const source = `${storageDirectory}${downloadFileName}`;
    const destination = `${localDirectory}${downloadFileName}`;
    const file = bucket.file(source);

    await file.download({ destination });
}

async function upload() {
    const source = `${localDirectory}${uploadFileName}`;
    const destination = `${storageDirectory}${uploadFileName}`;

    await bucket.upload(source, { destination });
}
