import Redis from 'ioredis';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const channel = argv.channel;

if (!channel) {
    console.error("Usage: npm run index-sub -- --channel 'channel'");
    process.exit(1);
}

const redis = new Redis();

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
