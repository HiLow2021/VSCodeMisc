import cors from 'cors';
import express from 'express';

const app = express();
const port = 5000;

const corsOptions = {
    origin: ['http://localhost:3000']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/api', (_, res, next) => {
    try {
        res.status(200).json({ message: 'Hello!' });
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
