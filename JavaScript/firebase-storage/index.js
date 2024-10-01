import * as dotenv from 'dotenv';
import { cert, initializeApp } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import fs from 'fs/promises';

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
    await downloadByData();
    await downloadByFile();
    await uploadByData();
    await uploadByFile();
})();

async function downloadByData() {
    const source = `${storageDirectory}${downloadFileName}`;
    const destination = `${localDirectory}${downloadFileName}`;
    const file = bucket.file(source);

    const [data] = await file.download();

    await fs.writeFile(destination, data);
}

async function downloadByFile() {
    const source = `${storageDirectory}${downloadFileName}`;
    const destination = `${localDirectory}${downloadFileName}`;
    const file = bucket.file(source);

    await file.download({ destination });
}

async function uploadByData() {
    const source = `${localDirectory}${uploadFileName}`;
    const destination = `${storageDirectory}${uploadFileName}`;
    const data = await fs.readFile(source);
    const file = bucket.file(destination);

    await file.save(data);

    file.setMetadata({
        contentType: 'image/png',
        metadata: {
            custom1: 'value1',
            custom2: 'value2'
        }
    });
}

async function uploadByFile() {
    const source = `${localDirectory}${uploadFileName}`;
    const destination = `${storageDirectory}${uploadFileName}`;

    await bucket.upload(source, { destination });
}
