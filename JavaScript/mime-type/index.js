import fs from 'fs';

const imageDirectory = './img/';

for (const extension of ['bmp', 'jpg', 'png', 'gif', 'webp', 'avif']) {
    const buffer = fs.readFileSync(`${imageDirectory}image.${extension}`);
    const mimeType = getMimeType(buffer);

    console.log(`image.${extension}: ${mimeType}`);
}

function getMimeType(data) {
    const encoding = 'hex';
    const block1 = data.subarray(0, 4).toString(encoding).toUpperCase();
    const block2 = data.subarray(4, 8).toString(encoding).toUpperCase();
    const block3 = data.subarray(8, 12).toString(encoding).toUpperCase();

    if (block1.startsWith('424D')) {
        return 'image/bmp';
    } else if (block1 === 'FFD8FFDB' || block1 === 'FFD8FFE0') {
        return 'image/jpeg';
    } else if (block1 === '89504E47') {
        return 'image/png';
    } else if (block1 === '47494638') {
        return 'image/gif';
    } else if (block1 === '52494646' && block3 === '57454250') {
        return 'image/webp';
    } else if (block1.startsWith('0000001C') && block2 === '66747970' && block3 === '61766966') {
        return 'image/avif';
    } else {
        return 'unknown';
    }
}
