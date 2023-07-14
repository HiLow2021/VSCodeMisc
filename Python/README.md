# Python

## 仮想環境を構築

1. 仮想環境を作成する
    ```ps
    PS > python -m venv <仮想環境名>
    ```

    例
    ```ps
    PS > python -m venv .venv
    ```

2. 仮想環境を有効化する
- Windows の場合
    ```ps
    PS > .venv/Scripts/activate.ps1
    ```
    activate.bat だと上手く動かなかった

- Mac、Linux の場合
    ```ps
    PS > source .venv/bin/activate
    ```

3. 仮想環境を無効化する
    ```ps
    (.venv) PS > deactivate
    ```

## 仮想環境のプロジェクトの依存パッケージを管理

1. 依存パッケージファイルを生成
    ```ps
    (.venv) PS > pip freeze > requirements.txt
    ```

2. 依存パッケージファイルからインストール
    ```ps
    (.venv) PS > pip install -r requirements.txt
    ```