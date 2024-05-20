# Jupyter

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

## Jupyter 環境を構築

1. Jupyter カーネルを仮想環境上にインストール
    ```ps
    (.venv) PS > python -m pip install ipykernel
    ```

2. VSCode に仮想環境上のインタプリターを登録する
    
    1. コマンドパレット (Ctrl + Shift + P) を開いて、Python Select Interpreter を入力。
    
    2. メニューの内の interpreter path... からインタープリターを選択。パス例: `~/.venv/Scripts/python.exe`

3. jupyter ファイル上で 2 で登録したカーネルを選択する。VSCode を開き直した場合など、インタープリターが表示されない場合は、再度 2 を行うこと。

## 仮想環境のプロジェクトの依存パッケージを管理

- 依存パッケージのリストを確認
    ```ps
    (.venv) PS > python -m pip list
    ```

- 依存パッケージをインストール
    ```ps
    (.venv) PS > python -m pip install <パッケージ名>
    ```

- 依存パッケージをアンインストール
    ```ps
    (.venv) PS > python -m pip uninstall <パッケージ名>
    ```

- 依存パッケージのリストをエクスポート
    ```ps
    (.venv) PS > python -m pip freeze > requirements.txt
    ```

- 依存パッケージのリストから一括インストール
    ```ps
    (.venv) PS > python -m pip install -r requirements.txt
    ```

## 参考

- https://dev.classmethod.jp/articles/windows-python-install-vscode-jupyter-notebook/