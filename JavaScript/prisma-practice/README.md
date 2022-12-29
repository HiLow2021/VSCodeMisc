# 導入

1. プロジェクト初期化

```sh
> npm init -y
> npm install typescript ts-node @types/node --save-dev
```

2. tsconfig.json の設定を下記に変更。

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

3. Prisma インストール

```sh
> npm install prisma --save-dev
```

4. Prisma セットアップ (MySQL用)

```sh
> npx prisma init --datasource-provider mysql
```

5. 既存のDBスキーマからPrismaスキーマを構築

```sh
> npx prisma db pull
```
  - prisma フォルダのschema.prismaファイルに、スキーマが追加される。

6. Prisma Client を生成する

```sh
> npx prisma generate
```
  - コード内で、Prisma Client を使用できるようになる。

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

# 接続先のDB

docker フォルダ参照。