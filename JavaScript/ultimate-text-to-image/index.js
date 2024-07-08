import fs from 'fs';
import { UltimateTextToImage } from 'ultimate-text-to-image';

const outDirectory = './out/';

if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const text = 'Sample Text';
const fontFamily = 'MS PGothic';

const textToImage = new UltimateTextToImage(text, {
    fontFamily: fontFamily,
    fontSize: 24,
    fontColor: '#FFFFFF',
    noAutoWrap: true
});
textToImage.render().toFile(`${outDirectory}result.png`);
