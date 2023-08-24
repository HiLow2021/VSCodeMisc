# Jest

https://jestjs.io/ja/docs/getting-started

## 導入

```ps
PS > npm install --save-dev jest
```

## 設定ファイルを生成

```ps
PS > npx jest --init
```

## TypeScript を使う

1. TypeScript を導入

```ps
PS > npm install --save-dev typescript
PS > npx tsc --init
```

2. Babel を導入

```ps
PS > npm install --save-dev babel-jest @babel/core @babel/preset-env @babel/preset-typescript
```

3. babel.config.js を作成

```js
// babel.config.js
module.exports = {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript']
};
```

4. テストの実行時にテストコードの型検査を行う

```ps
PS > npm install --save-dev ts-jest
```

```js
// jest.config.js
preset: "ts-jest",
```

5. テストの作成時に Jest の型定義を使う

```ps
PS > npm install --save-dev @jest/globals
```

```ts
// sample.test.ts
import { describe, expect, test } from '@jest/globals';
import { sum } from './sum';

describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
```