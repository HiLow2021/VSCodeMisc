import fs from 'fs';

const a = JSON.parse(fs.readFileSync('./input/a.json', 'utf-8'));
const b = JSON.parse(fs.readFileSync('./input/b.json', 'utf-8'));

const c = b.map((x) => (a[x.code] ? { ...a[x.code], ...x } : undefined)).filter((x) => x);
const d = Object.fromEntries(new Map(c.map((x) => [x.code, x])));

fs.writeFileSync('./output/result.json', JSON.stringify(d), 'utf-8');

console.log(d);
