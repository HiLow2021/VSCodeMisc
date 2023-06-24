# VSCodeでC#のビルドを行う方法

## 前提
C# の機能拡張をあらかじめVSCodeに入れておく。
コンソールプロジェクトのみを対象。フォームアプリケーションなどは素直にVisualStudioを使う方が無難。

## 手順
1. プロジェクトフォルダを生成

2. プロジェクト生成コマンドを実行
```ps
PS > dotnet new console
```

3. プロジェクトのビルドコマンド実行
```ps
PS > dotnet run
```