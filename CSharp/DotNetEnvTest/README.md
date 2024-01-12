# DotNetEnv

## 概要

- .env ファイルから環境変数を取得できるパッケージ。

## 手順

1. パッケージをインストール。

    ```PS
    PS > dotnet add package DotNetEnv
    ```

2. プロジェクトフォルダに .env ファイルを作成。

3. プロジェクトファイル (.csproj) に .env ファイルを出力ディレクトリにコピーする旨を記述。
    
    ```diff
    <ItemGroup>
    <PackageReference Include="DotNetEnv" Version="3.0.0" />
    +<None Update="./.env">
    +  <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    +  <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
    +</None>
    </ItemGroup>
    ```

- CopyToOutputDirectory と CopyToPublishDirectory に指定できる値。

    | 設定値 | 動作 |
    | --- | --- |
    | PreserveNewest | 項目変更時にコピー |
    | Always | 常にコピー |
    | Never | コピーしない |
    