#!/usr/bin/env node
import { Command } from 'commander';
import Redis from 'ioredis';

const program = new Command();
program
  .requiredOption('-o, --op <push|pop|list>', 'operation')
  .requiredOption('-k, --key <redisKey>', 'queue key')
  .option('-v, --value <string>', 'JSON/string value for push')
  .option('-p, --priority <number>', 'numeric priority (smaller = higher)', parseFloat, 1)
  .option('--ttl <sec>', 'lock TTL seconds', parseInt, 5)
  .parse(process.argv);

const { op, key, value, priority, ttl } = program.opts();
const client = new Redis();

const LOCK_KEY = `${key}:lock`;

async function withLock(fn) {
  const ok = await client.set(LOCK_KEY, '1', 'NX', 'EX', ttl);
  if (ok !== 'OK') {
    throw new Error('queue is locked by another writer');
  }
  try {
    return await fn();
  } finally {
    await client.del(LOCK_KEY);
  }
}

(async () => {
  switch (op) {
    case 'push':
      if (value === undefined) throw new Error('--value is required');
      await withLock(async () => {
        await client.zadd(key, priority, value);
        console.log(`PUSH "${value}" (pri=${priority})`);
      });
      break;

    case 'pop':
      // ZPOPMIN gets & removes the smallest-score element
      await withLock(async () => {
        const res = await client.zpopmin(key, 1);
        if (res.length === 0) {
          console.log('queue is empty');
        } else {
          console.log(`POP "${res[0]}" (pri=${res[1]})`);
        }
      });
      break;

    case 'list':
      // WITHSCORES で全件確認
      const all = await client.zrange(key, 0, -1, 'WITHSCORES');
      if (all.length === 0) {
        console.log('queue is empty');
      } else {
        console.log('--- queue contents ---');
        for (let i = 0; i < all.length; i += 2) {
          console.log(`${all[i]}  (pri=${all[i + 1]})`);
        }
      }
      break;

    default:
      throw new Error('unknown op');
  }
  client.disconnect();
})().catch(err => {
  console.error(err.message);
  client.disconnect();
  process.exit(1);
});
