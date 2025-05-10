import { createInterface } from 'readline';
import { connect } from 'socket.io-client';

const port = 5000;
const id = `client-id-${getRandomId(10000)}`;
const socket = connect(`http://localhost:${port}`, { query: { id } });

socket.on('message', (message) => {
    console.log(message);
    rl.prompt();
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('Enter your message: ');
rl.prompt();

rl.on('line', (line) => {
    if (/^exit$/i.test(line)) {
        rl.close();
        socket.close();

        return;
    }

    socket.emit('message', line);
}).on('close', () => {
    console.log(`disconnected: ${id}`);
});

function getRandomId(max) {
    const number = Math.floor(Math.random() * max);
    return number.toString().padStart(max.toString().length, '0');
}
