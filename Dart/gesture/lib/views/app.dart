import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const title = 'Flutter Gesture Demo';

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
  var position = const Offset(0, 0);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text(MyApp.title),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(40.0),
          child: GestureDetector(
            onTapDown: (details) {
              setState(() => position = details.localPosition);
            },
            onPanUpdate: (details) {
              setState(() => position = details.localPosition);
            },
            child: SizedBox(
              width: 800,
              height: 600,
              child: Card(
                color: Colors.lightBlue,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Text('X = ${position.dx}',
                        style: const TextStyle(fontSize: 32)),
                    Text('Y = ${position.dy}',
                        style: const TextStyle(fontSize: 32)),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
