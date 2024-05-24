import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:path_provider/path_provider.dart';

import 'package:local_storage/models/app_settings.dart';

class AppStorage {
  Future<String> get _localBaseDirectory async =>
      (await getApplicationDocumentsDirectory()).path;

  Future<String> get _localAppDirectory async =>
      '${await _localBaseDirectory}/flutter/local_storage/';

  Future<String> get _localPath async =>
      '${await _localAppDirectory}settings.json';

  Future<void> initialize() async {
    await _createDirectories();
  }

  Future<AppSettings?> load() async {
    try {
      final path = await _localPath;
      final file = File(path);
      final jsonString = await file.readAsString();
      final json = jsonDecode(jsonString) as Map<String, dynamic>;
      final settings = AppSettings.fromJson(json);

      return settings;
    } catch (e) {
      return null;
    }
  }

  Future<void> save(AppSettings settings) async {
    final path = await _localPath;
    final file = File(path);
    final json = settings.toJson();
    final jsonString = jsonEncode(json);

    await file.writeAsString(jsonString);
  }

  Future<void> delete() async {
    final path = await _localPath;
    final file = File(path);

    await file.delete();
  }

  Future<void> _createDirectories() async {
    final directory = Directory(await _localAppDirectory);

    if (!directory.existsSync()) {
      directory.createSync(recursive: true);
    }
  }
}
