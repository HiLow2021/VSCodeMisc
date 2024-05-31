import 'package:flutter/material.dart';
import 'package:layout_practice/views/destination.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const title = 'Flutter Layout Demo';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: MyApp.title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  static const thresholdWide = 1200;
  static const thresholdMiddle = 800;

  var selectedIndex = 0;

  Widget getPage() {
    switch (selectedIndex) {
      case 0:
        return const Text('Page 1', style: TextStyle(fontSize: 20));
      case 1:
        return const Text('Page 2', style: TextStyle(fontSize: 20));
      default:
        throw Exception();
    }
  }

  Widget drawer() {
    return NavigationDrawer(
      selectedIndex: selectedIndex,
      onDestinationSelected: (value) => setState(() => selectedIndex = value),
      children: <Widget>[
        const SizedBox(height: 20),
        ...destinations.map(
          (Destination destination) {
            return NavigationDrawerDestination(
              label: Text(destination.label),
              icon: destination.icon,
              selectedIcon: destination.selectedIcon,
            );
          },
        ),
      ],
    );
  }

  Widget sideBar(double width) {
    final isWide = width > thresholdWide;

    return NavigationRail(
      extended: isWide,
      labelType:
          isWide ? NavigationRailLabelType.none : NavigationRailLabelType.all,
      selectedIndex: selectedIndex,
      onDestinationSelected: (value) => setState(() => selectedIndex = value),
      destinations: destinations.map((Destination destination) {
        return NavigationRailDestination(
            label:
                Text(destination.label, style: const TextStyle(fontSize: 16)),
            icon: destination.icon,
            selectedIcon: destination.selectedIcon);
      }).toList(),
    );
  }

  Widget mainContent() {
    return Center(
      child: SingleChildScrollView(
          child: Center(
              child: Padding(
                  padding: const EdgeInsets.all(40), child: getPage()))),
    );
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final isMiddle = width > thresholdMiddle;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text(MyApp.title),
      ),
      drawer: isMiddle ? null : drawer(),
      body: Row(
        children: <Widget?>[
          isMiddle
              ? SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.all(10),
                    child: sideBar(width),
                  ),
                )
              : null,
          isMiddle ? const VerticalDivider(thickness: 1, width: 1) : null,
          Expanded(
            child: mainContent(),
          ),
        ].where((x) => x != null).cast<Widget>().toList(),
      ),
    );
  }
}
