import { PrismaClient } from '@prisma/client';
import express from 'express';

const app = express();
const port = 5000;

const prisma = new PrismaClient();

app.use(express.json());

app.get('/', async (_, res, next) => {
    try {
        const users = await prisma.users.findMany({ where: { gender: 'Male' } });

        res.status(200).json(users);
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
