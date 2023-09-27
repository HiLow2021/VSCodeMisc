import fs from 'fs';
import puppeteer from 'puppeteer';

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
await page.screenshot({ path: `${outDirectory}screenshot.png`, fullPage: true });
const html = await page.content();

fs.writeFileSync(`${outDirectory}page.html`, html, 'utf8');
await browser.close();
