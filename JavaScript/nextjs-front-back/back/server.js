import express from 'express';

const app = express();
const port = 5000;

app.use(express.json());

app.get('/api', (_, res, next) => {
    try {
        res.status(200).json({ text: 'Good!!' });
    } catch (error) {
        next(error);
    }

    next();
});

app.post('/api', (req, res, next) => {
    try {
        const { count } = req.body;
        res.status(200).json({ count: count + 1 });
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
});
