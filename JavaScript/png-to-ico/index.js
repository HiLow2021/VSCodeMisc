import fs from 'fs';
import icojs from 'icojs';
import pngToIco from 'png-to-ico';
import sharp from 'sharp';

const mediaDirectory = './media/';
const outDirectory = './out/';
const input = fs.readFileSync(`${mediaDirectory}input.png`);

if (!fs.existsSync(mediaDirectory)) {
    fs.mkdirSync(mediaDirectory);
}
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

try {
    const metadata = await sharp(input).metadata();
    if (metadata.width !== metadata.height) {
        throw new Error('画像の幅と高さが異なるため、正方形の画像を指定してください');
    }

    const originalSize = metadata.width;
    if (originalSize < 32) {
        throw new Error('32 ピクセル以上の画像を指定してください');
    }

    let maxSize = 1;
    while (maxSize * 2 <= originalSize) {
        maxSize *= 2;
    }

    const sizes = [originalSize];
    for (let size = maxSize; size >= 32; size = size / 2) {
        sizes.push(size);
    }

    const buffers = await Promise.all(sizes.reverse().map((size) => sharp(input).resize(size, size, { fit: 'contain' }).png().toBuffer()));
    const icoBuffer = await pngToIco(buffers);

    const images = await icojs.parseICO(new Uint8Array(icoBuffer), 'image/png');
    for (let i = 0; i < images.length; i++) {
        console.log({
            index: i + 1,
            width: images[i].width,
            height: images[i].height,
            bitDepth: images[i].bpp,
            bytes: images[i].buffer.byteLength
        });
    }

    fs.writeFileSync(`${outDirectory}result.ico`, icoBuffer);
    console.log('アイコンファイルの生成に成功しました');
} catch (error) {
    console.error('エラーが発生しました:', error);
}
