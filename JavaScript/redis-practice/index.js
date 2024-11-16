import { createClient } from 'redis';

const client = createClient({
    url: 'redis://localhost:6379'
}).on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', `value:${new Date().getTime()}`);

const value = await client.get('key');
console.log(`key: ${value}`);

await client.disconnect();
