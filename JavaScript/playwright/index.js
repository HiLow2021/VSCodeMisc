import { chromium } from 'playwright';
import fs from 'fs';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const browser = await chromium.launch();
const page = await browser.newPage({});

await page.goto('https://www.bing.com');
await page.screenshot({ path: `${outDirectory}screenshot.png`, fullPage: true });
const html = await page.content();

fs.writeFileSync(`${outDirectory}page.html`, html, 'utf8');
await browser.close();

