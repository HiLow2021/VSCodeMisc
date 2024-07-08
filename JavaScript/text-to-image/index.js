import fs from 'fs';
import sharp from 'sharp';
import pkg from 'text-to-svg';
const { loadSync } = pkg;

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const text = "('ω')";
const fontSize = 72;
const magnification = 2;
const attributes = { fill: 'white', stroke: 'black' };
const options = { x: 0, y: 0, fontSize: fontSize, anchor: 'top', attributes: attributes };

const textToSVG = loadSync();
const metrics = textToSVG.getMetrics(text, options);
const svg = textToSVG.getSVG(text, options);

await sharp(Buffer.from(svg))
    .resize({ width: metrics.width * magnification })
    .png()
    .toFile(`${outDirectory}result.png`);
