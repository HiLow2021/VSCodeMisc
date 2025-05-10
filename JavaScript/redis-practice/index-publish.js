import Redis from 'ioredis';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const channel = argv.channel;
const message = argv.message;

if (!channel || !message) {
    console.error("Usage: npm run index-pub -- --channel 'channel' --message 'message'");
    process.exit(1);
}

const redis = new Redis('redis://localhost:6379', {
    retryStrategy: (times) => {
        console.log(`Retrying to connect to Redis (attempt ${times})...`);

        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis
    .publish(channel, message)
    .then(() => {
        console.log(`Message "${message}" published to channel "${channel}".`);
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error publishing message:', err);
        process.exit(1);
    });

redis.on('connect', () => {
    console.log('\x1b[32m%s\x1b[0m', 'Redis connected');
});
redis.on('error', (_err) => {
    console.error('Redis connection error');
});

console.log('Press Ctrl+C to exit...');
