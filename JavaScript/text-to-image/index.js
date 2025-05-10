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
const fontColor = 'red';
const fontBorderColor = 'green';
const backgroundColor = 'blue';
const attributes = { fill: fontColor, stroke: fontBorderColor };
const options = { x: 0, y: 0, fontSize: fontSize, anchor: 'top', attributes: attributes };

const textToSVG = loadSync();
const svg = background(textToSVG.getSVG(text, options), backgroundColor);

await sharp(Buffer.from(svg)).png().toFile(`${outDirectory}result.png`);

function background(svg, color) {
    return svg.replace(/(^<svg.+>)(<path.+\/>)(<\/svg>)/, `\$1<rect width="100%" height="100%" fill="${color}" />\$2\$3`);
}
