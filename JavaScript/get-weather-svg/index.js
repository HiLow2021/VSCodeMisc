import fs from 'fs';
import fetch from 'node-fetch';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

for (let index = 0; index < 1000; index++) {
    const response = await fetch(`https://www.jma.go.jp/bosai/forecast/img/${index}.svg`);
    if (response.ok) {
        response.body.pipe(fs.createWriteStream(`${outDirectory}${index}.svg`));
    }
}
