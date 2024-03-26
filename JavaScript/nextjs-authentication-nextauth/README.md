# Next.js Authentication with NextAuth.js

## 概要

- Next.js アプリの認証に NextAuth.js を利用したデモリポジトリ。
- Next.js v14 & NextAuth.js v5 (ベータ版)
- App Router 対応

## 備考

- middleware.{js,ts} という名前のファイルを app ディレクトリと同じ階層に置くことで、各ルーティング前に割り込み処理を行える。
- env ファイルに NEXTAUTH_SECRET をセットする必要あり。ない場合、TypeError: "ikm"" must be an instance of Uint8Array or a string が発生。

## 引用

> This is a [Next.js](https://nextjs.org/) project bootstrapped with > [`create-next-app`](https://github.com/vercel/next.js/tree/canary/> packages/create-next-app).
> 
> ## Getting Started
> 
> First, run the development server:
> 
> ```bash
> npm run dev
> # or
> yarn dev
> # or
> pnpm dev
> # or
> bun dev
> ```
> 
> Open [http://localhost:3000](http://localhost:3000) with your browser > to see the result.
> 
> You can start editing the page by modifying `app/page.tsx`. The page > auto-updates as you edit the file.
> 
> This project uses [`next/font`](https://nextjs.org/docs/basic-features/> font-optimization) to automatically optimize and load Inter, a custom > Google Font.
> 
> ## Learn More
> 
> To learn more about Next.js, take a look at the following resources:
> 
> - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.> js features and API.
> - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js > tutorial.
> 
> You can check out [the Next.js GitHub repository](https://github.com/> vercel/next.js/) - your feedback and contributions are welcome!
> 
> ## Deploy on Vercel
> 
> The easiest way to deploy your Next.js app is to use the [Vercel > Platform](https://vercel.com/new?utm_medium=default-template&> filter=next.js&utm_source=create-next-app&> utm_campaign=create-next-app-readme) from the creators of Next.js.
> 
> Check out our [Next.js deployment documentation](https://nextjs.org/> docs/deployment) for more details.
> 