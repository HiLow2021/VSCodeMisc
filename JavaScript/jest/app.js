// app.js
const express = require('express');
const app = express();

app.use(express.json());

const users = [
    { id: 1, name: 'Alice', age: 20 },
    { id: 2, name: 'Betty', age: 30 }
];

app.get('/', (req, res) => {
    const name = req.query.name;
    if (!name) {
        res.json(users);
        return;
    }

    const user = users.find((x) => x.name === name);
    if (user) {
        res.json(user);
        return;
    }

    res.status(404).json({ message: 'Not found' });
});

app.post('/', (req, res) => {
    const id = users.length + 1;
    const newUser = { id, ...req.body };

    users.push(newUser);

    res.json({ id });
});

app.put('/', (req, res) => {
    const body = req.body;
    const user = users.find((x) => x.name === body.name);
    if (user) {
        user.age = body.age;
        res.sendStatus(200);
        return;
    }

    res.status(404).json({ message: 'Not found' });
});

app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((x) => x.id === id);
    let deletedCount = 0;
    if (index >= 0) {
        users.splice(index, 1);
        deletedCount++;
    }

    res.json({ deletedCount });
});

module.exports = {
    app,
    users
};
