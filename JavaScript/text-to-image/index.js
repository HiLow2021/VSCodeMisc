import fs from 'fs';
import sharp from 'sharp';
import pkg from 'text-to-svg';
const { loadSync } = pkg;

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const text = 'Sample Text';
const fontSize = 72;
const attributes = { fill: 'white', stroke: 'black' };
const options = { x: 0, y: 0, fontSize: fontSize, anchor: 'top', attributes: attributes };

const textToSVG = loadSync();
const svg = textToSVG.getSVG(text, options);

await sharp(Buffer.from(svg)).png().toFile(`${outDirectory}result.png`);
