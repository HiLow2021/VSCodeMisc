import fs from 'fs';
import icojs from 'icojs';

const mediaDirectory = './media/';

if (!fs.existsSync(mediaDirectory)) {
    fs.mkdirSync(mediaDirectory);
}

const input = fs.readFileSync(`${mediaDirectory}input.ico`);

const images = await icojs.parseICO(input, 'image/png');
for (let i = 0; i < images.length; i++) {
    console.log({
        index: i + 1,
        width: images[i].width,
        height: images[i].height,
        bitDepth: images[i].bpp,
        bytes: images[i].buffer.byteLength
    });
}
