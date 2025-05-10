import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';
import fetch from 'node-fetch';

dotenv.config({ path: '.env' });

const inputDirectory = './media/';
const outDirectory = './out/';

if (!fs.existsSync(inputDirectory)) {
    fs.mkdirSync(inputDirectory);
}
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const apiUrl = process.env.GOKAPI_API_URL;
const apiKey = process.env.GOKAPI_API_KEY;

await upload('sample.txt');
await upload('sample.png');

async function upload(filename) {
    const form = new FormData();
    form.append('file', fs.readFileSync(`${inputDirectory}${filename}`), filename);
    form.append('allowedDownloads', 0);
    form.append('expiryDays', 7);

    const res = await fetch(`${apiUrl}/files/add`, {
        method: 'POST',
        headers: {
            apikey: apiKey,
            ...form.getHeaders()
        },
        body: form
    });

    const data = await res.json();

    console.log('data', data);
}
