import Redis from 'ioredis';

const redis = new Redis('redis://localhost:6379');

redis.on('error', (err) => console.error('Redis Client Error', err));

await redis.set('key', `value:${new Date().getTime()}`);

const value = await redis.get('key');
console.log(`key: ${value}`);

redis.disconnect();
