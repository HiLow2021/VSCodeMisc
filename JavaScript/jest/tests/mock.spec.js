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
        const axios = require('axios').default;

        jest.mock('axios');

        const data = { id: 1, name: 'Alice' };
        axios.get.mockResolvedValue(data);
        // axios.get.mockImplementation(() => Promise.resolve(data));

        // expect.assertionsはアサーションの回数を指定する
        // 非同期のテストでは必要になる場合がある
        expect.assertions(1);
        await expect(axios.get('http://localhost/not-implemented-api')).resolves.toEqual(data);
    });
});
