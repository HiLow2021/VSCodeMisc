import Redis from 'ioredis';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const channel = argv.channel;

if (!channel) {
    console.error("Usage: npm run index-sub -- --channel 'channel'");
    process.exit(1);
}

const redis = new Redis('redis://localhost:6379', {
    maxRetriesPerRequest: null,
    retryStrategy: (times) => {
        console.log(`Retrying to connect to Redis (attempt ${times})...`);

        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.subscribe(channel, (err) => {
    if (err) {
        console.error('Failed to subscribe:', err);
        process.exit(1);
    }

    console.log(`Subscribed successfully to channel "${channel}". Waiting for messages...`);
});

redis.on('message', (chan, message) => {
    console.log(`Received message from channel "${chan}": ${message}`);
});
redis.on('connect', () => {
    console.log('\x1b[32m%s\x1b[0m', 'Redis connected');
});
redis.on('error', (_err) => {
    console.error('Redis connection error');
});

console.log('Press Ctrl+C to exit...');
