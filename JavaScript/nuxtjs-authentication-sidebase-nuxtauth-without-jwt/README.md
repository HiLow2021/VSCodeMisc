# Nuxt.js Authentication with Sidebase Nuxt-Auth (without jwt)

## 概要

- Nuxt.js アプリの認証に @sidebase/nuxt-auth を利用したデモリポジトリ。
- Nuxt.js v3 & Nuxt-Auth.js v0.7
- 認証形式は Local Provider (メールアドレスやパスワードを自前で用意 & 認証する方式) を使用。

## 公式

- https://nuxt.com/
- https://sidebase.io/nuxt-auth/getting-started

## 備考

- Nuxt.js v3 に自前の Auth モジュールが組み込まれる予定らしいが、現状は @sidebase/nuxt-auth を使用する必要があるとのこと。
- @sidebase/nuxt-auth は v0.6 から Local Provider (Auth.js における Credentials Provider) が使用できるようになった。
- jwt を返す場合 ([nuxtjs-authentication-sidebase-nuxtauth](../nuxtjs-authentication-sidebase-nuxtauth/)) と対比をするためのリポジトリ。
  <span style="color: orange">jwt を適切に返さないことによる不具合が生じる可能性があることに注意</span>

## 参考

- https://reffect.co.jp/nuxt/sidebase-nuxt-auth
- https://github.com/sidebase/nuxt-auth/tree/main/playground-local
  
  - jwt を使った、より実践的なサンプル

## 引用

> # Nuxt 3 Minimal Starter
> 
> Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
> 
> ## Setup
> 
> Make sure to install the dependencies:
> 
> ```bash
> # npm
> npm install
> 
> # pnpm
> pnpm install
> 
> # yarn
> yarn install
> 
> # bun
> bun install
> ```
> 
> ## Development Server
> 
> Start the development server on `http://localhost:3000`:
> 
> ```bash
> # npm
> npm run dev
> 
> # pnpm
> pnpm run dev
> 
> # yarn
> yarn dev
> 
> # bun
> bun run dev
> ```
> 
> ## Production
> 
> Build the application for production:
> 
> ```bash
> # npm
> npm run build
> 
> # pnpm
> pnpm run build
> 
> # yarn
> yarn build
> 
> # bun
> bun run build
> ```
> 
> Locally preview production build:
> 
> ```bash
> # npm
> npm run preview
> 
> # pnpm
> pnpm run preview
> 
> # yarn
> yarn preview
> 
> # bun
> bun run preview
> ```
> 
> Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
> 