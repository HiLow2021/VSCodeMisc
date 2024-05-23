import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ThemeModeToggleButton extends StatelessWidget {
  const ThemeModeToggleButton({super.key});

  @override
  Widget build(BuildContext context) {
    final themeModeState = context.watch<ThemeModeState>();

    Color getColor() {
      switch (themeModeState.currentThemeMode) {
        case ThemeMode.light:
          return Colors.orange;
        case ThemeMode.dark:
          return Colors.yellow;
        case ThemeMode.system:
          return Theme.of(context).colorScheme.onPrimaryContainer;
        default:
          throw UnsupportedError('');
      }
    }

    Icon getIcon() {
      switch (themeModeState.currentThemeMode) {
        case ThemeMode.light:
          return const Icon(Icons.light_mode);
        case ThemeMode.dark:
          return const Icon(Icons.dark_mode);
        case ThemeMode.system:
          return const Icon(Icons.monitor);
        default:
          throw UnsupportedError('');
      }
    }

    final color = getColor();
    final icon = getIcon();

    return FloatingActionButton(
      onPressed: () {
        themeModeState.toggleThemeMode();
      },
      foregroundColor: color,
      shape: const CircleBorder(),
      child: icon,
    );
  }
}

class ThemeModeSegmentedButton extends StatelessWidget {
  const ThemeModeSegmentedButton({super.key});

  @override
  Widget build(BuildContext context) {
    final themeModeState = context.watch<ThemeModeState>();

    return SegmentedButton<ThemeMode>(
      segments: const <ButtonSegment<ThemeMode>>[
        ButtonSegment<ThemeMode>(
            value: ThemeMode.light,
            label: Text('Light'),
            icon: Icon(Icons.light_mode)),
        ButtonSegment<ThemeMode>(
            value: ThemeMode.dark,
            label: Text('Dark'),
            icon: Icon(Icons.dark_mode)),
        ButtonSegment<ThemeMode>(
            value: ThemeMode.system,
            label: Text('System'),
            icon: Icon(Icons.monitor)),
      ],
      selected: {themeModeState.currentThemeMode},
      onSelectionChanged: (Set<ThemeMode> themeMode) {
        themeModeState.setThemeMode(themeMode.first);
      },
    );
  }
}

class ThemeModeState extends ChangeNotifier {
  var currentThemeMode = ThemeMode.system;

  void toggleThemeMode() {
    currentThemeMode =
        currentThemeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    notifyListeners();
  }

  void setThemeMode(ThemeMode themeMode) {
    if (themeMode != currentThemeMode) {
      currentThemeMode = themeMode;
      notifyListeners();
    }
  }
}
