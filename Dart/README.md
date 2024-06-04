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

## パッケージ

- [公式](https://pub.dev/)

## マテリアルデザイン (UIフレームワーク)

- Flutter 3.16 から、マテリアルデザインはデフォルトで導入済みなので、別途インストールする必要なし。
- [公式](https://m3.material.io/)
- [コードサンプル](https://api.flutter.dev/flutter/material/material-library.html)
- [アイコン検索](https://fonts.google.com/icons)

## コマンド

### パッケージ

- パッケージ更新

```sh
> flutter pub get
```

- パッケージ追加

```sh
> flutter pub add <package_name>
```

- パッケージ削除

```sh
> flutter pub remove <package_name>
```

### ビルド

```sh
> flutter build <target_platform>
```

- 例
```sh
> flutter build windows
```

### プロジェクト

- build ディレクトリなど削除

```sh
> flutter clean
```

### Android

- Android SDK のパスを設定

```sh
> flutter config --android-sdk <sdk_directory_name>
```

- 例
```sh
> flutter config --android-sdk "C:\Users\<User>\AppData\Local\Android\Sdk"
```

## テスト

```sh
> flutter test
```

## リリース (公開)

### 手順

- Google PlayとApp Storeの場合は、公開のための申請を行い、審査を受ける必要あり。

| プラットフォーム | 手順 |
| --- | --- |
| Android | Google Playにアップロードして、公開 |
| iOS | App Storeにアップロードして、公開 |
| Web | Webサーバ (Firebase Hosting など) にデプロイ |
| Windows | 実行可能形式にビルドして配布 |
| macOS | 実行可能形式にビルドして配布 |
| Linux | 実行可能形式にビルドして配布 |

### アプリ名の変更

| プラットフォーム | パス | 説明 |
| --- | --- | --- |
| Android | android/app/src/main/AndroidManifest.xml | android:label の値を変更 |
| iOS | ios/Runner/info.plist | key が CFBundleName の値を変更 |

### アイコンの変更

1. [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons) パッケージをインストール

```sh
> flutter pub add flutter_launcher_icons
```

2. pubspec.yaml に flutter_launcher_icons の設定を追加

```yml
// 例
dev_dependencies:
  flutter_launcher_icons: "^0.13.1"

flutter_launcher_icons:
  android: true
  ios: true
  image_path: "assets/icon/icon.png"
  min_sdk_android: 21 # android min sdk min:16, default 21
  web:
    generate: true
    image_path: "path/to/image.png"
    background_color: "#hexcode"
    theme_color: "#hexcode"
  windows:
    generate: true
    image_path: "path/to/image.png"
    icon_size: 48 # min:48, max:256, default: 48
  macos:
    generate: true
    image_path: "path/to/image.png"
```

3. `flutter pub run flutter_launcher_icons` コマンドを実行

## その他

### Flutter 関連のインストール状況を調べる方法

- `flutter doctor -v` コマンドを使う。

### デバッグ時のデバイスを変更する方法

Ctrl + Shift + P でコマンドパレットを開いて、Flutter: Select Device を選択。

<a id="android"></a>

### Android SDK を既にインストールしている場合

- `flutter config --android-sdk <sdk_directory_name>` でインストール先を直接設定する。
- Windows 10 & Visual Studio 2022 経由で Android SDK をインストールしている場合、`C:\Program Files (x86)\Android\android-sdk` にインストールされている可能性が高い。

### Android SDK を既にインストールしているが、Android Studio 経由の Android SDK のパスに変更したい場合

- `flutter config --android-sdk <sdk_directory_name>` でインストール先を直接設定する。
- Android Studio をデフォルトの設定でインストールしている場合、`C:\Users\<User>\AppData\Local\Android\Sdk` にインストールされている可能性が高い。

### Android デバッグ用のデバイス選択時にエラーが発生する場合

- Hyper-V が起動しているか確認する。ただし、動作が重いため、正規の Intel HAXM をインストールするか、実機を使ったデバッグを推奨。

### Git Clone でリポジトリをクローンした時にエラーが発生する場合

- `flutter pub get` で依存パッケージを更新。