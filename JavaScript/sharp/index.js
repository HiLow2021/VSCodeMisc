import fs from 'fs';
import sharp from 'sharp';

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const text = '<span foreground="red">Red!</span>\n<span background="cyan">blue</span>';
const size = 2048;
const margin = 20;

const textPng = sharp({
    text: {
        text,
        align: 'center',
        dpi: size,
        rgba: true,
        
    }
}).png();
const metadata = await textPng.metadata();

await sharp({
    create: {
        width: metadata.width + margin * 2,
        height: metadata.height + margin * 2,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
})
    .composite([
        {
            input: await textPng.toBuffer(),
            left: margin,
            top: margin
        }
    ])
    .png()
    .toFile(`${outDirectory}result.png`);
