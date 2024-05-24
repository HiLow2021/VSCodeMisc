# Dart (Flutter)

## 公式

- https://flutter.dev/
- https://docs.flutter.dev/
- https://github.com/flutter/flutter

## 導入手順 (Android App on Windows)

1. Flutter SDK をインストール。

    1. パッケージをダウンロードする場合は、ダウンロードした後に、パスに `~/flutter/bin` を通す。

    2. Flutter リポジトリをクローンする場合は、クローンした後に、パスに `~/flutter/bin` を通す。

2. Android SDK をインストール。

    1. Android SDK をインストールしていない場合、Android Studio をインストール。

    2. Android SDK をインストールしている場合は、[下記](#android)を参照。

3. VSCode で Flutter の拡張機能をインストール。

4. Ctrl + Shift + P でコマンドパレットを開いて、Flutter: New Project -> Application で新規プロジェクトを作成。

5. `lib/main.dart` を選択して開く。

6. F5 でデバッグを実行。

## マテリアルデザイン (UIフレームワーク)

- Flutter 3.16 から、マテリアルデザインはデフォルトで導入済みなので、別途インストールする必要なし。
- [公式](https://m3.material.io/)
- [コードサンプル](https://api.flutter.dev/flutter/material/material-library.html)
- [アイコン検索](https://fonts.google.com/icons)

## パッケージ

- パッケージ追加

```sh
> flutter pub add <package_name>
```

- パッケージ削除

```sh
> flutter pub remove <package_name>
```

## その他

### Flutter 関連のインストール状況を調べる方法

- `flutter doctor -v` コマンドを使う。

### デバッグ時のデバイスを変更する方法

Ctrl + Shift + P でコマンドパレットを開いて、Flutter: Select Device を選択。

<a id="android"></a>

### Android SDK を既にインストールしている場合

- `flutter config --android-sdk <sdk_directory_name>` でインストール先を直接設定する。
- Windows 10 & Visual Studio 2022 経由で Android SDK をインストールしている場合、`C:\Program Files (x86)\Android\android-sdk` にインストールされている可能性が高い。

### Android デバッグ用のデバイス選択時にエラーが発生する場合

- Hyper-V が起動しているか確認する。ただし、動作が重いため、正規の Intel HAXM をインストールするか、実機を使ったデバッグを推奨。