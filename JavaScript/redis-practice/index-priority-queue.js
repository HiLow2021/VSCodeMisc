// priority_queue_ioredis.js
import Redis from 'ioredis';
import { Command } from 'commander';

const program = new Command();
program
  .option('--push <value>',   'キューに追加するデータ')
  .option('--priority <num>', '優先度 (小さいほど高優先度)', parseFloat)
  .option('--pop',            '最優先の要素を取り出す')
  .option('--list',           '全要素を確認する')
  .parse(process.argv);

const redis = new Redis();          // デフォルト localhost:6379
await redis.connect();              // v5 以降は connect() を await 可

const KEY = 'pq:zset';

if (program.push) {
  const pri = program.priority ?? 0;
  // ioredis: score, member の順
  await redis.zadd(KEY, pri, program.push);
  console.log(`PUSH: "${program.push}" (priority=${pri})`);
} else if (program.pop) {
  // zpopmin は [member, score] ペアの flat 配列
  const res = await redis.zpopmin(KEY);
  if (res.length === 0) {
    console.log('Queue empty');
  } else {
    const [member, score] = res;
    console.log(`POP → ${member} (priority=${score})`);
  }
} else if (program.list) {
  // WITHSCORES で flat 配列 [member1, score1, member2, score2...]
  const flat = await redis.zrange(KEY, 0, -1, 'WITHSCORES');
  const rows = [];
  for (let i = 0; i < flat.length; i += 2) {
    rows.push({ value: flat[i], score: Number(flat[i + 1]) });
  }
  console.table(rows);
} else {
  program.help();
}

await redis.quit();
