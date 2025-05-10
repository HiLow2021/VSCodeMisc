import fs from 'fs';
import sharp from 'sharp';

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const text = '<span foreground="red">Red!</span>\n<span background="cyan">blue</span>';
const size = 2048;
const margin = 20;

// line height を調整するために、行ごとに画像を作成、合成する
const textPngList = [...text].map((line) =>
    sharp({
        text: {
            text: line,
            align: 'center',
            dpi: size * 4,
            rgba: true
        }
    }).png()
);
const metadataList = await Promise.all(textPngList.map(async (textPng) => await textPng.metadata()));
const maxWidth = metadataList.reduce((max, metadata) => Math.max(max, metadata.width), 0);
const height = metadataList.reduce((sum, metadata) => sum + metadata.height, 0);

await sharp({
    create: {
        width: maxWidth + margin * 2,
        height: height + margin * 2,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
})
    .composite(
        await Promise.all(
            textPngList.map(async (textPng, i) => ({
                input: await textPng.toBuffer(),
                left: margin,
                top: i * metadataList[i].height + margin
            }))
        )
    )
    .png()
    .toBuffer()
    .then((data) => {
        sharp(data).resize(size).toFile(`${outDirectory}result.png`);
    });
