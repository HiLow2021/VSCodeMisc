import puppeteer from 'puppeteer';
import fs from 'fs';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();

await page.goto('https://www.google.com/');
await page.screenshot({ path: './out/screenshot.png', fullPage: true });
const html = await page.content();

fs.writeFileSync(`${outDirectory}page.html`, html, 'utf8');
await browser.close();
