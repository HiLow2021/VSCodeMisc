const zlib = require('zlib');

const text = 'a'.repeat(10000);
const compressedText = zip(text);
const decompressedText = unzip(compressedText);

console.log(`Original size: ${text.length} bytes`);
console.log(`Compressed size: ${compressedText.length} bytes`);
console.log(`Original Text === Decompressed Text: ${text === decompressedText}`);

function zip(data) {
    const str = encodeURIComponent(data);
    const zip = zlib.gzipSync(str);
    const result = zip.toString('base64');

    return result;
}

function unzip(data) {
    const buffer = Buffer.from(data, 'base64');
    const unzip = zlib.unzipSync(buffer);
    const result = decodeURIComponent(unzip).toString('utf-8');

    return result;
}
