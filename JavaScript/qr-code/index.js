import { Jimp } from 'jimp';
import jsQR from 'jsqr';

const imagePath = 'qr.png';

const image = await Jimp.read(imagePath);
const { data, width, height } = image.bitmap;
const qrCode = jsQR(data, width, height);

if (qrCode) {
    console.log('QR Code URL:', qrCode.data);
} else {
    console.log('No QR code found in the image.');
}
