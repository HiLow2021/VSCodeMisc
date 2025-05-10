import fs from 'fs';

const a = JSON.parse(fs.readFileSync('input/a.json', 'utf-8'));
const b = Object.entries(a).map(([x, y]) => [[x], y.split('，')]);
const c = Object.fromEntries(new Map(b));

fs.writeFileSync('output/result.json', JSON.stringify(c), 'utf-8');
