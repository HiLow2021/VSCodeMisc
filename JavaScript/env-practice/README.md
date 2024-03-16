## Node.js における環境変数の取り扱い型メモ

- 環境毎に env ファイルを作る。
- 適用する env ファイルの場合分けは、コード上で行うのではなく npm scripts で行う。
    - env-cmd パッケージを使う。
- NODE_ENV は development か production のみを取る。
- .env.local のみ、値を空にして Git で管理。必要な環境変数を伝える。