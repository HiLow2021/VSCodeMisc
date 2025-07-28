// key_store_ioredis.js
import Redis from 'ioredis';
import { Command } from 'commander';

const program = new Command();
program
  .requiredOption('--key <name>',  '対象キー名')
  .option('--value <data>',       '書き込むデータ（省略で読み取りモード）')
  .option('--work <sec>',         'ロック保持中の擬似作業時間', parseInt, 5)
  .option('--ttl <sec>',          'ロック TTL 秒',              parseInt, 30)
  .option('--interval <ms>',      '再試行間隔ミリ秒',            parseInt, 200)
  .parse(process.argv);

const { key, value, work, ttl, interval } = program.opts();

const redis   = new Redis();
await redis.connect();

const lockKey = `lock:${key}`;
const ownerId = `pid-${process.pid}-${Date.now()}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ────────────────────────────────────────────────
// 読み取りモード
if (value === undefined) {
  const current = await redis.get(key);
  console.log(
    current === null
      ? `(key "${key}" は存在しません)`
      : `GET "${key}" -> ${current}`,
  );
  await redis.quit();
  process.exit(0);
}
// ────────────────────────────────────────────────

// 書き込みモード
async function acquireLock() {
  while (true) {
    // ioredis: オプションは文字列で渡す
    const ok = await redis.set(lockKey, ownerId, 'NX', 'PX', ttl * 1000);
    if (ok === 'OK') return true;           // 取得成功
    process.stdout.write('.');              // 待機を可視化
    await sleep(interval);
  }
}

try {
  await acquireLock();
  console.log(`\n✅ lock acquired by ${ownerId}`);

  // クリティカルセクション
  console.log(`SET "${key}" -> ${value}`);
  await redis.set(key, value);

  // 擬似的に重い処理
  await sleep(work * 1000);
  console.log(`(simulated work ${work}s finished)`);

} finally {
  // 自分のロックなら解放
  if ((await redis.get(lockKey)) === ownerId) {
    await redis.del(lockKey);
    console.log('🔓 lock released');
  }
  await redis.quit();
}
