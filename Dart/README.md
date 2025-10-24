# Dart (Flutter)

## 公式

- https://flutter.dev/
- https://docs.flutter.dev/
- https://github.com/flutter/flutter

## 導入手順 (Android App on Windows)

1. Flutter SDK をインストール。

    - パッケージをダウンロードする場合は、ダウンロードした後に、パスに `~/flutter/bin` を通す。

    - Flutter リポジトリをクローンする場合は、クローンした後に、パスに `~/flutter/bin` を通す。

2. Android SDK をインストール。

    - Android SDK をインストールしていない場合、Android Studio をインストール。

    - Android SDK をインストールしている場合は、[下記](#android)を参照。

3. VSCode で Flutter の拡張機能をインストール。

4. Ctrl + Shift + P でコマンドパレットを開いて、Flutter: New Project -> Application で新規プロジェクトを作成。

5. `lib/main.dart` を選択して開く。

6. F5 でデバッグを実行。

## 導入手順 (Android App on WSL with fvm)

- Ubuntu 24.04 LTS で確認

1. OpenJDK をインストール (例: oepnjdk-17)

```sh
sudo apt update
sudo apt install -y openjdk-17-jdk zip unzip curl git xz-utils
java -version
```

2. Android SDK をインストール (CLI ツール含む)

- 環境変数を設定 (永続化は、[下記](#wsl-を再起動しても永続化するように設定ファイルに環境変数を追記)を参照)

```sh
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH"
export ADB_SERVER_SOCKET="tcp:$(ip route | awk '/^default via/ {print $3; exit}'):5037"
```

- CLI ツール配置

```sh
mkdir -p "$ANDROID_SDK_ROOT/cmdline-tools"
cd /tmp
# CLI ツールのバージョンは適宜変更
curl -LO https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip -q commandlinetools-linux-*_latest.zip -d cmdline-tools-tmp
mkdir -p "$ANDROID_SDK_ROOT/cmdline-tools/latest"
mv cmdline-tools-tmp/cmdline-tools/* "$ANDROID_SDK_ROOT/cmdline-tools/latest/"
rm -rf cmdline-tools-tmp
```

- ライセンス同意

```sh
yes | sdkmanager --licenses
```

- パッケージをインストール (例: SDK 35)

```sh
sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"
```

3. dart をインストール

```sh
sudo apt update
sudo apt install -y git curl unzip xz-utils zip gnupg ca-certificates apt-transport-https

# Dart 公式APTリポ追加
curl -fsSL https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/dart-archive-keyring.gpg] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main" | sudo tee /etc/apt/sources.list.d/dart_stable.list

sudo apt update
sudo apt install -y dart

# pub 実行ファイルの PATH を通す
cat <<'EOF' >> ~/.bashrc
# Dart pub
export PATH="$HOME/.pub-cache/bin:$PATH"
EOF
source ~/.bashrc
```

4. fvm (flutter 管理ツール) の導入

```sh
dart pub global activate fvm
fvm --version
```

5. Windows 側の準備 (エミュレーター or 実機)

    1. Android Studio インストール

    2. adb.exe で `adb -a start-server` 実行
        - adb サーバーが  0.0.0.0:5037 で Listening されていること

    3. Android Studio を起動して、Virtual Device Manager で Android エミュレーター起動
        - 実機の場合、USB 接続

    4. `adb devices` でデバイスが認識されていることを確認

6. デバック実行

```sh
cd /path/to/your/project
fvm install stable
fvm use stable
fvm flutter pub get
fvm flutter run -d <device_id>
```

## パッケージ

- [公式](https://pub.dev/)

## マテリアルデザイン (UIフレームワーク)

- Flutter 3.16 から、マテリアルデザインはデフォルトで導入済みなので、別途インストールする必要なし。
- [公式](https://m3.material.io/)
- [コードサンプル](https://api.flutter.dev/flutter/material/material-library.html)
- [アイコン検索](https://fonts.google.com/icons)

## コマンド

### flutter

#### パッケージ

- パッケージ更新

```sh
flutter pub get
```

- パッケージ追加

```sh
flutter pub add <package_name>
```

- パッケージ追加 (開発用)

```sh
flutter pub add --dev <package_name>
```

- パッケージ削除

```sh
flutter pub remove <package_name>
```

#### 実行

- ビルド

```sh
flutter build <target_platform>

# 例
flutter build windows
```

- 実行

```sh
flutter run -d <device_id>

# 例
flutter run -d emulator-5554
```

#### プロジェクト

- build ディレクトリなど削除

```sh
flutter clean
```

#### Android

- Android SDK のパスを設定

```sh
flutter config --android-sdk <sdk_directory_name>

# 例
flutter config --android-sdk "C:\Users\<User>\AppData\Local\Android\Sdk"
```

### fvm

- flutter コマンド使用

```sh
# 例
fvm flutter --version
fvm flutter doctor -v
fvm flutter pub get
```

- インストール済みだけを表示

```sh
fvm list
```

- このディレクトリで使われる SDK パスを確認

```sh
fvm which
```

- リモートの入手可能リリース一覧（インストール済みではない）

```sh
fvm releases
```

- 特定バージョンをインストール

```sh
fvm install stable
fvm install 3.22.0
```

- 特定バージョンをアンインストール

```sh
fvm remove 3.22.0
```

※ そのバージョンをプロジェクトやグローバルで使用中なら、先に切り替えてから削除してください:

```sh
fvm use 3.24.0 --save   # プロジェクト用の切替
fvm global 3.24.0       # グローバル切替
fvm remove 3.22.2
```

### adb

- デバイス管理

```sh
adb start-server                # ADB サーバー起動
adb -a start-server             # ADB サーバー起動 (0.0.0.0)
adb kill-server                 # ADB サーバー停止
adb devices -l                  # 接続デバイス一覧（詳細付き）
adb connect <host>:<port>       # ネットワーク経由で接続（例: 192.168.0.10:5555）
adb disconnect [<host>:<port>]  # ネットワーク接続を切断
adb tcpip 5555                  # USB 接続中の端末を Wi‑Fi デバッグ待受に切替
```

- 再起動/ブート関連

```sh
adb reboot                      # 通常再起動
adb reboot bootloader           # ブートローダーへ再起動（対応端末）
```

- ポートフォワード

```sh
adb forward tcp:8080 tcp:8080   # PC -> 端末（順方向）
adb reverse tcp:8080 tcp:8080   # 端末 -> PC（逆方向、開発で便利）
```

### その他

- サーバー稼働状況確認

```sh
netstat -ano | findstr <port>
# 例
netstat -ano | findstr 5037
```

- WSL 側から adb ポート疎通の確認

```sh
timeout 3 bash -c "echo > /dev/tcp/$(ip route | awk '/^default via/ {print $3; exit}')/5037" && echo OK || echo NG
```

- WSL 上の OpenJDK の切り替え

```sh
sudo update-java-alternatives --list
sudo update-java-alternatives --set <NAME> (NAME は --list の1列目)
```

## テスト

```sh
flutter test
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
| Windows | [window_manager](https://pub.dev/packages/window_manager) を使用 |
| macOS | [window_manager](https://pub.dev/packages/window_manager) を使用 |
| Linux | [window_manager](https://pub.dev/packages/window_manager) を使用 |

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

## トラブルシューティング

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

### WSL を再起動しても永続化するように設定ファイルに環境変数を追記

```sh
cat <<'EOF' >> ~/.bashrc
# Android SDK
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH"

# Windows 側 adb サーバーに接続する場合に有効にする
# Windows の IP が変わるので動的取得で設定
export ADB_SERVER_SOCKET="tcp:$(ip route | awk '/^default via/ {print $3; exit}'):5037"
EOF
source ~/.bashrc
```

### WSL 側で `adb devices` で、Windows 側のデバイスが認識できない
    
- adb サーバーを 0.0.0.0 で起動していない
    - PC 起動時や Android Studio を起動すると、自動的に adb サーバーが 127.0.0.1 で起動するので、一旦終了してから、手動で `adb -a start-server` で adb サーバー起動
- adb サーバーが Windows Firewall で遮断されている
    - Windows セキュリティ > ファイアウォールによるアプリケーションの許可から、adb.exe (TCP 5037) を追加して、プライベートとパブリックにチェックマークを入れる

### adb サーバーが勝手に起動してしまい、0.0.0.0 で起動できない
    
- Android Studio を起動すると、adb サーバーが 127.0.0.1 で起動を繰り返すので、一旦終了してから、`adb kill-server && adb -a start-server` で手動で adb サーバーを起動した後に、Android Studio を起動
    - `netstat -ano | findstr 5037` で、adb サーバーの起動状態を確認可能

### adb.exe の場所

- Windows 10 では、`C:/Users/<ユーザー名>/AppData/Local/Android/Sdk/platform-tools/adb.exe`
- Android Studio で、Settings > Appearance & Behavior > System Settings > Android SDK の「SDK Location」を開き、その配下の platform-tools/adb.exe
- adb.exe を PATH に追加しておくと adb コマンドがターミナルのどこからも使えて便利