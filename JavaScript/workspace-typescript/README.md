# Workspace TypeScript

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

2. TypeScript を導入。
    1. TypeScript をルートにインストール。

    ```ps
    PS > npm install --save-dev typescript
    ```

    2. 各ワークスペース内で TypeScript を初期化。

    ```ps
    PS > npx tsc --init
    ```

3. 各ワークスペースの tsconfig.json を適切に変更。
    1. rootDir, outDir を適切に設定する。
    2. モジュールを参照するプロジェクトは references を設定。
    3. モジュールを参照するプロジェクトは moduleResolution を Node16 or NodeNext or Bundler に変更。
    4. 3 に伴って、モジュールを参照するプロジェクトは module を moduleResolution に準じた値に変更。
    5. モジュールを参照されるプロジェクトは composite を true に設定。

    ```json
    // tsconfig.json
    // 参照する側
    {
      "compilerOptions": {
        "target": "es2016",
        "module": "NodeNext",
        "rootDir": "./src",
        "moduleResolution": "NodeNext",
        "outDir": "./build",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
      },
      "references": [{ "path": "../shared" }]
    }

    // 参照される側
    {
      "compilerOptions": {
        "composite": true,
        "target": "es2016",
        "module": "commonjs",
        "rootDir": "./src",
        "outDir": "./build",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true
      }
    }
    ```

4. モジュールを参照されるプロジェクトの package.json の exports を適切に変更。コード上で、rootDir と outDir の参照先を意識しないようにするため。 

```json
// package.json
{
  "name": "shared",
  "exports": {
    ".": {
      "types": "./build/index.d.ts",
      "default": "./build/index.js"
    },
    "./*": {
      "types": "./build/*.d.ts",
      "default": "./build/*.js"
    }
  }
}
```

5. モジュールを参照するプロジェクトの package.json の dependencies にモジュールを追加する。コード上で、インテリセンスを働かせるため。

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

- https://stackoverflow.com/questions/70296652/how-can-i-use-exports-in-package-json-for-nested-submodules-and-typescript
- https://zenn.dev/makotot/articles/5edb504ef7d2e6