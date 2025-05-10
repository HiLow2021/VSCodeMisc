import { describe, expect, jest, test } from '@jest/globals';
import axios from 'axios';

// jest.mock はトップレベルに書く
jest.mock('axios');

describe('Mock Test', () => {
    test('fn', () => {
        const fn = jest.fn(() => 'mock');

        expect(fn()).toBe('mock');
    });

    test('spyOn', () => {
        jest.spyOn(Math, 'random').mockImplementation(() => 0.1);

        expect(Math.random()).toBe(0.1);
    });

    test('mock', async () => {
        const mockedAxios = jest.mocked(axios, { shallow: false });

        const data = { id: 1, name: 'Alice' };
        mockedAxios.get.mockResolvedValue(data);

        // expect.assertionsはアサーションの回数を指定する
        // 非同期のテストでは必要になる場合がある
        expect.assertions(1);
        await expect(mockedAxios.get('http://localhost/not-implemented-api')).resolves.toEqual(data);
    });
});
