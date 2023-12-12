# Playwright

## 手順

1. 依存パッケージをインストール (復元)。

    ```PS
    PS > dotnet restore
    ```

2. プロジェクトをビルド。

    ```PS
    PS > dotnet build
    ```

3. ./bin/Debug/netX フォルダ内の playwright.ps1 を実行して、ブラウザをインストール。

    ```PS
    PS > ./playwright.ps1 install
    ```

4. プロジェクトを実行。

    ```PS
    PS > dotnet run
    ```

## 備考

`dotnet build` や `dotnet run` は `dotnet restore` の操作を含むので、厳密には手順の 1 は不要。備忘録のために敢えて残しています。