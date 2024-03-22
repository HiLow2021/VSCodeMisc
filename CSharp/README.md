# C#

## 前提

- C# の機能拡張を VSCode に入れる。
- コンソールプロジェクトのみを対象。フォームアプリケーションなどは素直に VisualStudio を使う方が無難。

## C# のビルドを行う

1. プロジェクトフォルダを生成

2. プロジェクト生成コマンドを実行

```ps
PS > dotnet new console
```

3. プロジェクトのビルドコマンド実行

```ps
PS > dotnet run
```

## パッケージ管理 (NuGet)

- 追加

```ps
PS > dotnet add package <パッケージ名>
```

- 削除

```ps
PS > dotnet add package <パッケージ名>
```

- 復元 (インストール)

```ps
PS > dotnet restore
```