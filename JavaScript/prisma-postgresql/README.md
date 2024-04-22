# Prisma with PostgreSQL

## 概要

- Prisma でデータを挿入するサンプル
- Nextjs-14-Tutorial のデータを使用
- PostgreSQL 使用

## 公式

- https://www.prisma.io/docs/orm/overview/databases/postgresql

## 導入

1. プロジェクト初期化

```sh
> npm init -y
```

2. Prisma インストール

```sh
> npm install prisma --save-dev
```

3. Prisma セットアップ (PostgreSQL用)

```sh
> npx prisma init --datasource-provider postgresql
```

4. .env ファイルに指定したDBのURLを記述 (PostgreSQL用)

```
DATABASE_URL="postgresql://postgres:password@localhost:15432/mydb?schema=public"
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