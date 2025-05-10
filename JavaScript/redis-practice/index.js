import Redis from 'ioredis';

const redis = new Redis('redis://localhost:6379', {
    maxRetriesPerRequest: null,
    retryStrategy: (times) => {
        console.log(`Retrying to connect to Redis (attempt ${times})...`);

        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.on('connect', () => {
    console.log('\x1b[32m%s\x1b[0m', 'Redis connected');
});
redis.on('error', (_err) => {
    console.error('Redis connection error');
});

(async () => {
    await redis.set('key', `value:${new Date().getTime()}`);

    const value = await redis.get('key');
    console.log(`key: ${value}`);

    redis.disconnect();
})();

console.log('Press Ctrl+C to exit...');
