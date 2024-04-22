# Prisma with MongoDB

## 概要

- Prisma でデータを取得するサンプル
- MongoDB 使用

## 公式

- https://www.prisma.io/docs/orm/overview/databases/mongodb

## 導入

1. プロジェクト初期化

```sh
> npm init -y
```

2. Prisma インストール

```sh
> npm install prisma --save-dev
```

3. Prisma セットアップ (MongoDB用)

```sh
> npx prisma init --datasource-provider mongodb
```

4. .env ファイルに指定したDBのURLを記述 (MongoDB用)

```
DATABASE_URL="mongodb://root:password@localhost:27017/mydb?authSource=admin"
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

## 接続先のDB

docker フォルダ参照。