import fs from 'fs';
import fetch from 'node-fetch';
import sharp from 'sharp';

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const size = 256;

const url = 'https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/1F60A.svg';
const response = await fetch(url);
const text = await response.text();

await sharp(Buffer.from(text)).resize(size).png().toFile('./out/result.png');
