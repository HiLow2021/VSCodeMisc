# Prisma with MySQL

## 概要

- Prisma でデータを取得するサンプル
- MySQL 使用

## 公式

- https://www.prisma.io/docs/orm/overview/databases/mysql

## 導入

### JavaScript 版

1. プロジェクト初期化

```sh
> npm init -y
```

2. Prisma インストール

```sh
> npm install prisma --save-dev
```

3. Prisma セットアップ (MySQL用)

```sh
> npx prisma init --datasource-provider mysql
```

4. .env ファイルに指定したDBのURLを記述 (MySQL用)

```
DATABASE_URL="mysql://root:password@localhost:13306/mydb"
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

### TypeScript 版

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

5. .env ファイルに指定したDBのURLを記述 (MySQL用)

```
DATABASE_URL="mysql://root:password@localhost:13306/mydb"
```

6. 既存のDBスキーマからPrismaスキーマを構築

```sh
> npx prisma db pull
```
  - prisma フォルダのschema.prismaファイルに、スキーマが追加される。

7. Prisma Client を生成する

```sh
> npx prisma generate
```
  - コード内で、Prisma Client を使用できるようになる。

```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

## 接続先のDB

docker フォルダ参照。