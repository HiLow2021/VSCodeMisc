import { describe, expect, test } from '@jest/globals';
import { add, div, mul, sub } from '../src/function';

describe('Function Test', () => {
    test('add', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('sub', () => {
        expect(sub(2, 1)).toBe(1);
    });

    test('mul', () => {
        expect(mul(3, 4)).toBe(12);
    });

    test('div', () => {
        expect(div(1, 2)).toBe(0.5);
    });
});
