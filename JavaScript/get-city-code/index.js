import fs from 'fs';
import fetch from 'node-fetch';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const url = 'https://maps.gsi.go.jp/js/muni.js';
const response = await fetch(url);

if (response.ok) {
    const text = await response.text();
    const lines = text.split('\n').filter((x) => x.startsWith('GSI'));
    const result = {};

    for (const line of lines) {
        const match = line.match(/GSI\.\w*?\["(\d+)"\] = '(\d+),([^,]+),\d+,([^']+)'/);

        if (match) {
            const [, cityCode, prefCode, pref, city] = match;
            result[cityCode] = {
                prefectureCode: parseInt(prefCode),
                prefecture: pref,
                cityCode: parseInt(cityCode),
                city: city
            };
        }
    }

    fs.writeFileSync(`${outDirectory}gsi.json`, JSON.stringify(result, null, 4));
}
