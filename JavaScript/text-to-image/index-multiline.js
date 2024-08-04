import fs from 'fs';
import sharp from 'sharp';
import pkg from 'text-to-svg';
const { loadSync } = pkg;

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const text = 'Sample Text\nSample Text Extra\n\nSample Text Extra Extra';
const size = 2048;
const fontSize = 72;
const fontColor = 'red';
const fontBorderColor = 'green';
const backgroundColor = 'blue';
const attributes = { fill: fontColor, stroke: fontBorderColor };
const options = { x: 0, y: 0, fontSize, anchor: 'top', attributes: attributes };

const textToSVG = loadSync();

const lines = text.split('\n').map((line) => (line === '' ? ' ' : line));
const svgList = lines.map((line) => background(textToSVG.getSVG(line, options), backgroundColor));
const metrics = lines.map((line) => textToSVG.getMetrics(line, options));
const margin = 20;

await sharp({
    create: {
        width: metrics.reduce((max, metric) => Math.max(max, metric.width), 0) + margin * 2,
        height: metrics.reduce((sum, metric) => sum + metric.height, 0) + margin * 2,
        channels: 4,
        background: backgroundColor
    }
})
    .composite(
        svgList.map((svg, i) => ({
            input: Buffer.from(svg),
            left: margin,
            top: i * fontSize + margin
        }))
    )
    .png()
    .toBuffer()
    .then((data) => sharp(data).resize(size).toFile(`${outDirectory}result.png`));

function background(svg, color) {
    return svg.replace(/(^<svg.+>)(<path.+\/>)(<\/svg>)/, `\$1<rect width="100%" height="100%" fill="${color}" />\$2\$3`);
}
