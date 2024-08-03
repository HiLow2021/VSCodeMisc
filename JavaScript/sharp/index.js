import fs from 'fs';
import sharp from 'sharp';

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const text = '<span foreground="red">Red!</span>\n<span background="cyan">blue</span>';
const size = 2048;

await sharp({
    text: {
        text,
        align: 'center',
        dpi: size,
        rgba: true
    }
})
    .png()
    .resize(size)
    .toFile(`${outDirectory}result.png`);
