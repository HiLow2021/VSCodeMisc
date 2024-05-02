# Workspace JavaScript

## 導入

1. Node.js プロジェクトの初期化。
    1. ルート作成。

    ```ps
    PS > npm init -y
    ```
    2. ワークスペースを設定。(package.json に workspaces を追加)

    ```ps
    PS > npm init -w <workspace> -y
    ```

2. モジュールを参照するプロジェクトの package.json の dependencies にモジュールを追加する。コード上で、インテリセンスを働かせるため。

```json
// package.json
{
  "name": "app",
  "dependencies": {
    "shared": "1.0.0"
  }
}
```

## 備考

- プロジェクトを別のディレクトリに移動する場合、再度 npm install をすること。ルートの node_modules 内のワークスペース参照先を更新する必要があるため。

## 参考

- https://zenn.dev/makotot/articles/5edb504ef7d2e6