import Redis from 'ioredis';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const channel = argv.channel;
const message = argv.message;

if (!channel || !message) {
    console.error("Usage: npm run index-pub -- --channel 'channel' --message 'message'");
    process.exit(1);
}

const redis = new Redis();

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
