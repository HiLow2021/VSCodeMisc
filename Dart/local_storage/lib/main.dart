import 'package:flutter/material.dart';
import 'package:local_storage/app_storage.dart';

import 'app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await initialize();

  runApp(const MyApp());
}

Future<void> initialize() async {
  AppStorage().initialize();
}
