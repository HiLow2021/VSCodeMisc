import fetch from 'node-fetch';

const port = 5000;
const url = `http://localhost:${port}`;

const result1 = await send(url, undefined);
console.log(result1);

const result2 = await send(url, result1.cookie);
console.log(result2);

async function send(url, cookie) {
    const response = await fetch(url, {
        headers: {
            accept: '*/*',
            cookie
        },
        method: 'GET'
    });
    const text = await response.text();
    const parsedCookie = parseCookie(response);

    return { text, cookie: parsedCookie };
}

function parseCookie(response) {
    const raw = response.headers.raw()['set-cookie'];
    return raw
        .map((entry) => {
            const parts = entry.split(';');
            const cookiePart = parts[0];
            return cookiePart;
        })
        .join(';');
}
