#!/usr/bin/env node
import { Command } from 'commander';
import Redis from 'ioredis';

const program = new Command();
program
  .requiredOption('-o, --op <set|get>', 'operation')
  .requiredOption('-k, --key <redisKey>', 'key')
  .option('-v, --value <string>', 'value for set')
  .option('--ttl <sec>', 'lock TTL seconds', parseInt, 5)
  .parse(process.argv);

const { op, key, value, ttl } = program.opts();
const client = new Redis();
const LOCK_KEY = `${key}:lock`;

async function withLock(fn) {
  const ok = await client.set(LOCK_KEY, '1', 'NX', 'EX', ttl);
  if (ok !== 'OK') {
    throw new Error('key is locked by another writer');
  }
  try {
    return await fn();
  } finally {
    await client.del(LOCK_KEY);
  }
}

(async () => {
  if (op === 'set') {
    if (value === undefined) throw new Error('--value is required');
    await withLock(async () => {
      await client.set(key, value);
      console.log(`SET ${key} = ${value}`);
    });
  } else if (op === 'get') {
    const res = await client.get(key);
    console.log(`${key} = ${res}`);
  } else {
    throw new Error('unknown op');
  }
  client.disconnect();
})().catch(err => {
  console.error(err.message);
  client.disconnect();
  process.exit(1);
});
