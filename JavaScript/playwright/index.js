import { chromium } from 'playwright';
import fs from 'fs/promises';

const outDirectory = './out/';

const browser = await chromium.launch();
const page = await browser.newPage({});

await page.goto('https://www.bing.com');
await page.screenshot({ path: './out/screenshot.png', fullPage: true });
const html = await page.content();
await browser.close();

await fs.writeFile(`${outDirectory}page.html`, html, 'utf8');
