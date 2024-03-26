import fs from 'fs';
import { UltimateTextToImage } from 'ultimate-text-to-image';

const input = 'sampleAA.txt';
const text = fs.readFileSync(`./input/${input}`, { encoding: 'utf-8' });
const replacedText = text.replace(/　/g, '  ');
const fontFamily = 'MS PGothic';

const textToImage = new UltimateTextToImage(replacedText, {
    fontFamily: fontFamily,
    fontSize: 24,
    fontColor: '#FFFFFF',
    noAutoWrap: true
});
textToImage.render().toFile(`./output/out_${input}_${fontFamily.replace(/\s+?/g, '_')}.png`);
