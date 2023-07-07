import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();
const port = 5000;

app.use(cookieParser());

app.get('/', async (req, res) => {
    res.cookie('last-access', Date.now(), {
        maxAge: 60000, // (valid within 60 seconds)
        httpOnly: true
    });

    res.cookie('passport', true, {
        expires: new Date(Date.now() + 10000), // (valid within 10 seconds)
        httpOnly: true
    });

    console.log(req.cookies);

    const message = req.cookies['passport'] ? 'accessed within 10 seconds.' : 'first time accessed.';
    res.status(200).send(message);
});

app.listen(port, () => {
    console.log(`start on port ${port}`);
});
