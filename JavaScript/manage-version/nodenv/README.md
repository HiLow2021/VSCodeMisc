# nodenv

## 概要

- Node.js のバージョン管理ツール
- .node-version ファイルで状態管理
- ディレクトリごとの自動バージョン切り替え & インストール可能

## インストール

1. 依存パッケージをインストール

```sh
> apt install -y git build-essential libssl-dev wget
```

2. nodenv をクローン

```sh
> git clone https://github.com/nodenv/nodenv.git ~/.nodenv
```

3. ~/.bashrc の最後に以下の内容を追記

```sh
export NODENV_ROOT="$HOME/.nodenv"
export PATH="$NODENV_ROOT/bin:$PATH"
eval "$(nodenv init -)"
```

4. シェルの設定ファイルを再読み込み

```sh
source ~/.bashrc
```

5. nodenv のプラグインをインストール

```sh
mkdir -p "$(nodenv root)"/plugins
git clone https://github.com/nodenv/node-build.git "$(nodenv root)"/plugins/node-build
```

6. nodenv のインストールを確認

```sh
> nodenv -v
```

## アンインストール

1. ~/bashrc の nodenv 関連の記述を削除

2. 下記コマンド実行

```sh
> rm -rf `nodenv root`
```

## コマンド

- 一覧確認

```sh
> nodenv install --list-all
```

- インストール

```sh
> nodenv install <node_version>
```

- アンインストール

```sh
> nodenv uninstall <node_version>
```

- デフォルトのバージョン設定

```sh
> nodenv global <node_version>
```
