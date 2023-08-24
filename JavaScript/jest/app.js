// app.js
const express = require('express');
const app = express();

app.use(express.json());

const users = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Betty', age: 30 }
];

app.get('/', (_req, res) => {
    res.json(users);
});

app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((x) => x.id === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

app.post('/', (req, res) => {
    const id = users.length + 1;
    const newUser = { id, ...req.body };

    users.push(newUser);

    res.json({ id });
});

app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((x) => x.id === id);
    if (user) {
        user.name = req.body.name;
        user.age = req.body.age;
        res.sendStatus(200);

        return;
    }

    res.status(404).json({ message: 'Not found' });
});

app.delete('/', (req, res) => {
    const ids = req.body;
    let deletedCount = 0;
    for (const id of ids) {
        const index = users.findIndex((x) => x.id === id);
        if (index >= 0) {
            users.splice(index, 1);
            deletedCount++;
        }
    }

    res.json({ deletedCount });
});

module.exports = {
    app,
    users
};
