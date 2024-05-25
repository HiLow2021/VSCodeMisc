import 'package:flutter/material.dart';

import 'package:canvas/views/components/paint_canvas.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const title = 'Flutter Canvas Demo';

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
  List<Offset?> points = [];

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
            onPanUpdate: (DragUpdateDetails details) {
              setState(() => points.add(details.localPosition));
            },
            onPanEnd: (DragEndDetails details) {
              points.add(null);
            },
            child: SizedBox(
              width: 800,
              height: 600,
              child: Card(
                color: Colors.lightBlue,
                child: CustomPaint(
                  painter: PaintCanvas(points: points),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
