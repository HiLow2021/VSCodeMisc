import fs from 'fs';
import { chromium } from 'playwright';

const outDirectory = './out/';
if (!fs.existsSync(outDirectory)) {
    fs.mkdirSync(outDirectory);
}

const browser = await chromium.launch({ timeout: 60000 });
const context = await browser.newContext({ viewport: { width: 1920, height: 1200 } });
const page = await context.newPage();

await pattern1(page);
await pattern2(page);

await browser.close();

async function pattern1(page) {
    const url = 'https://www.jma.go.jp/bosai/map.html#5/34.5/137/&contents=forecast';
    await page.goto(url);
    await page.waitForSelector('body .leaflet-basemap-pane', { state: 'attached' });
    await page.waitForSelector('body .leaflet-panel-zoom5-pane', { state: 'attached' });
    await page.waitForSelector('body .leaflet-class10sFill-pane', { state: 'attached' });
    await page.screenshot({ path: `${outDirectory}screenshot1.png`, clip: { x: 400, y: 100, width: 1006, height: 1000 } });
}

async function pattern2(page) {
    const url = 'https://tenki.jp/';
    await page.goto(url);
    const element = page.locator('#forecast-map-wrap > picture img');
    await element.screenshot({
        path: `${outDirectory}screenshot2.png`,
        mask: [
            page.locator('#forecast-map-wrap #pc-map-back-btn'),
            page.locator('#forecast-map-wrap #pc-map-ad'),
            page.locator('#forecast-map-wrap .forecast-map-btn-wrap')
        ],
        maskColor: '#FFFFFF'
    });
}
