import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'components/theme_mode.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const title = 'Flutter Dark Mode Demo';

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => ThemeModeState(),
      builder: (context, child) => MaterialApp(
        title: MyApp.title,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.deepPurple, brightness: Brightness.light),
          useMaterial3: true,
        ),
        darkTheme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.deepPurple, brightness: Brightness.dark),
          useMaterial3: true,
        ),
        themeMode: context.watch<ThemeModeState>().currentThemeMode,
        home: const MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text(MyApp.title),
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Spacer(),
            Text('Toggle Button'),
            SizedBox(height: 20),
            ThemeModeToggleButton(),
            SizedBox(height: 20),
            Text('Segmented Button'),
            SizedBox(height: 20),
            ThemeModeSegmentedButton(),
            SizedBox(height: 20),
            Spacer(),
          ],
        ),
      ),
    );
  }
}
