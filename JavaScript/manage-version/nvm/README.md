# nvm

## 概要

- Node.js のバージョン管理ツール
- .nvmrc ファイルで状態管理
- Windows 未対応なため、代替ツールとして [nvm-windows](https://github.com/coreybutler/nvm-windows) を使用

## インストール

```sh
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

> wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
```

## アンインストール

1. 下記コマンド実行

```sh
# 削除するディレクトリを事前に確認したいなら echo $NVM_DIR
> rm -rf $NVM_DIR
```

2. ~/bashrc の nvm 関連の記述を削除

## コマンド

- 一覧確認

```sh
> nvm ls
```

- インストール

```sh
> nvm install <node_version>
```

- アンインストール

```sh
> nvm uninstall <node_version>
```

- バージョン切り替え

```sh
> nvm use <node_version>
```

## ディレクトリごとの自動バージョン切り替え & インストール

1. ~/bashrc の最後に下記を追記

```sh
cdnvm() {
    command cd "$@" || return $?
    nvm_path="$(nvm_find_up .nvmrc | command tr -d '\n')"

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version
        default_version="$(nvm version default)"

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [ $default_version = 'N/A' ]; then
            nvm alias default node
            default_version=$(nvm version default)
        fi

        # If the current version is not the default version, set it to use the default version
        if [ "$(nvm current)" != "${default_version}" ]; then
            nvm use default
        fi
    elif [[ -s "${nvm_path}/.nvmrc" && -r "${nvm_path}/.nvmrc" ]]; then
        declare nvm_version
        nvm_version=$(<"${nvm_path}"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "${nvm_version}" | command tail -1 | command tr -d '\->*' | command tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [ "${locally_resolved_nvm_version}" = 'N/A' ]; then
            nvm install "${nvm_version}";
        elif [ "$(nvm current)" != "${locally_resolved_nvm_version}" ]; then
            nvm use "${nvm_version}";
        fi
    fi
}

alias cd='cdnvm'
cdnvm "$PWD" || exit
```