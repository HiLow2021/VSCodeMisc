import fetch from 'node-fetch';

console.log(await fetchText());
console.log(await fetchJson());

async function fetchText() {
    const response = await fetch('https://github.com/');
    const body = await response.text();

    return body;
}

async function fetchJson() {
    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();

    return data;
}
