import 'package:flutter/material.dart';
import 'package:local_storage/models/app_storage.dart';

import 'views/app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await initialize();

  runApp(const MyApp());
}

Future<void> initialize() async {
  AppStorage().initialize();
}
