import 'package:dialog/models/dialog_utility.dart';
import 'package:flutter/material.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const title = 'Flutter Dialog Demo';

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
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text(MyApp.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            SizedBox(
              width: 200,
              height: 40,
              child: FilledButton(
                child: const Text('Message', style: TextStyle(fontSize: 20)),
                onPressed: () async {
                  if (context.mounted) {
                    await DialogUtility.showMessageDialog(
                        context: context,
                        title: 'Message',
                        message: 'Message Description',
                        onOk: () => print('Message: OK'));
                  }
                },
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: 200,
              height: 40,
              child: FilledButton(
                child: const Text('Error', style: TextStyle(fontSize: 20)),
                onPressed: () async {
                  if (context.mounted) {
                    await DialogUtility.showErrorDialog(
                        context: context,
                        title: 'Error',
                        message: 'Error Description',
                        onOk: () => print('Error: OK'));
                  }
                },
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: 200,
              height: 40,
              child: FilledButton(
                child:
                    const Text('Confirmation', style: TextStyle(fontSize: 20)),
                onPressed: () async {
                  if (context.mounted) {
                    final result = await DialogUtility.showConfirmationDialog(
                        context: context,
                        title: 'Confirmation',
                        message: 'Confirmation Description');

                    print('Confirmation: ${result == true ? 'OK' : 'Cancel'}');
                  }
                },
              ),
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: 200,
              height: 40,
              child: FilledButton(
                child: const Text('Progress', style: TextStyle(fontSize: 20)),
                onPressed: () async {
                  if (context.mounted) {
                    var isCanceled = false;

                    Future<void> process(int percentage) async {
                      await Future.delayed(const Duration(seconds: 5));
                      print('process has $percentage% finished');

                      if (isCanceled) {
                        throw Exception();
                      }
                    }

                    await DialogUtility.showProgressDialog(
                        context: context,
                        title: 'Progress',
                        message: 'Progress Description',
                        task: () async {
                          try {
                            print('Process has started');
                            await process(25);
                            await process(50);
                            await process(75);
                            await process(100);
                          } catch (e) {
                            print('Process has canceled');
                          }
                        },
                        onCancel: () {
                          isCanceled = true;
                        });
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
