import { ping } from 'shared';
import { add, div, mul, sub } from 'shared/utility/function';

console.log(ping());

const a = 1;
const b = 2;

console.log(add(a, b));
console.log(sub(a, b));
console.log(mul(a, b));
console.log(div(a, b));
