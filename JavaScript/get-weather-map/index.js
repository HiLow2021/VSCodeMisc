import { chromium } from 'playwright';
import fs from 'fs';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1920, height: 1200 } });
const page = await context.newPage();

const url = 'https://www.jma.go.jp/bosai/map.html#5/34.5/137/&contents=forecast';
await page.goto(url);
await page.waitForSelector('body .leaflet-basemap-pane', { state: 'attached' });
await page.waitForSelector('body .leaflet-panel-zoom5-pane', { state: 'attached' });
await page.waitForSelector('body .leaflet-class10sFill-pane', { state: 'attached' });
await page.screenshot({ path: `${outDirectory}screenshot.png`, clip: { x: 400, y: 100, width: 1006, height: 1000 } });

await browser.close();
