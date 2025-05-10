import fs from 'fs';
import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const url = 'https://www.npmjs.com/package/jsdom';
const response = await fetch(url);
const text = await response.text();

const dom = new JSDOM(text);
const content = dom.window.document.querySelector('#readme').textContent;

if (content) {
    console.log(content);
    fs.writeFileSync(`${outDirectory}result.txt`, content, 'utf8');
}
