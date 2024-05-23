import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ThemeModeButton extends StatelessWidget {
  const ThemeModeButton({super.key});

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
            icon: Icon(Icons.system_update)),
      ],
      selected: {themeModeState.currentThemeMode},
      onSelectionChanged: (Set<ThemeMode> themeMode) {
        themeModeState.changeThemeMode(themeMode.first);
      },
    );
  }
}

class ThemeModeState extends ChangeNotifier {
  var currentThemeMode = ThemeMode.system;

  void changeThemeMode(ThemeMode themeMode) {
    if (themeMode != currentThemeMode) {
      currentThemeMode = themeMode;
      notifyListeners();
    }
  }
}
