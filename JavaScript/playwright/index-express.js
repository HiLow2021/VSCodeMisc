import express from 'express';
import { chromium } from 'playwright';

const app = express();
const port = 5000;
const browser = await chromium.launch();

app.get('/', async (req, res, next) => {
    try {
        const url = req.query.url;
        const page = await browser.newPage();
        await page.goto(url);
        const html = await page.content();
        await page.close();

        res.status(200).send(html);
    } catch (error) {
        next(error);
    }

    next();
});

app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(port, () => {
    console.log(`start on port ${port}`);
}).on('exit', async () => {
    await browser.close();
});
