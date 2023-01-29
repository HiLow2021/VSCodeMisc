import fs from 'fs';
import fetch from 'node-fetch';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory, { recursive: true });
}

const baseUrl = 'http://www.google.com/s2/favicons?domain='; // google の非公式API。末尾に対象のURLを入れる
const targetUrl = 'https://github.com/';
const url = baseUrl + targetUrl;

const response = await fetch(url);
if (response.ok) {
    response.body.pipe(fs.createWriteStream(`${outDirectory}favicon.png`));
}
