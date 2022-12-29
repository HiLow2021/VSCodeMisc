## このプロジェクトについて

node.js と TypeScript を使ったプロジェクトの作成の流れを自分なりにまとめたもの

- 初期化コマンド
    - npm init -y
        - -y は node.js プロジェクト初期化時の選択をスキップ。

    - npm i typescript --save-dev
        - --save は dependencies (プロジェクト運用に必須なパッケージ)
        - --save-dev (もしくは、-D) は devDependencies (プロジェクト開発に必須なパッケージ)

    - npx tsc --init

    - npm i --save-dev ts-node nodemon
        - ts-node は、ts ファイルを直接実行できるパッケージ。一度、node.js にトランスパイルしてから実行する必要がなくなる。
        - nodemon は、ソースビルド時に、node を自動で再起動するパッケージ。開発時に有用。

- node.js や TypeScript の設定について
    - package.json や tsconfig.json を参考のこと

- eslint (コードのエラーチェック)
    - npm i --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
        - eslint は、コードのエラーチェックをしてくれるlinterと呼ばれるパッケージ。詳細については、https://eslint.org/docs/user-guide/configuring/

    - npx eslint --init
        - 初期化コマンド。.eslintrc.json が生成される。 

- prettier (コード整形)
    - npm i --save-dev prettier eslint-config-prettier
        - prettier は、コードを整形してくれるパッケージ。詳細については、https://prettier.io/docs/en/index.html
        - eslint-config-prettier は、eslint にもコード整形の機能があるので、双方の調整をするために必要。

    - .eslintrc.json の extends の最後に 'prettier' を加える。
        - 今までは、'prettier', 'prettier/@typescript-eslint' の二つを記述する必要があったが、"prettier/@typescript-eslint" は eslint-config-prettier の "prettier" にマージされた。

    - .prettierrc に prettier の整形ルールを設定できる。このプロジェクトの .prettierrc を参考のこと。