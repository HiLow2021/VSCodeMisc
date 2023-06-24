import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

const outDirectory = './out/';
if(!fs.existsSync(outDirectory)){
    fs.mkdirSync(outDirectory);
}

puppeteer.use(StealthPlugin());
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
