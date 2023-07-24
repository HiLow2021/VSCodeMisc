import sharp from 'sharp';
import fs from 'fs';

function splitImage(imagePath, saveDirectory, n) {
    sharp(imagePath)
        .metadata()
        .then((metadata) => {
            const { width, height } = metadata;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    const left = (j * width) / n;
                    const top = (i * height) / n;
                    const right = ((j + 1) * width) / n;
                    const bottom = ((i + 1) * height) / n;
                    sharp(imagePath)
                        .extract({ left, top, width: right - left, height: bottom - top })
                        .toFile(`${saveDirectory}split_${i}_${j}.jpg`);
                }
            }
        });
}

const imageDirectory = './media/';
const outDirectory = './out/';
const size = 3;

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

splitImage(`${imageDirectory}image.jpg`, outDirectory, size);
