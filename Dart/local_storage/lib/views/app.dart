import 'package:flutter/material.dart';
import 'package:local_storage/models/app_settings.dart';
import 'package:local_storage/models/app_storage.dart';
import 'package:local_storage/views/components/dialog.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  static const title = 'Flutter Local Storage Demo';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: MyApp.title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: MyHomePage(storage: AppStorage()),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.storage});

  final AppStorage storage;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void initState() {
    super.initState();

    widget.storage.load().then((settings) {
      setState(() {
        if (settings != null) {
          _nameController.text = settings.name;
          _emailController.text = settings.email;
          _passwordController.text = settings.password;
        }
      });
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text(MyApp.title),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 40.0),
          child: SizedBox(
            width: 600,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                TextField(
                  controller: _nameController,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.person),
                    suffixIcon: IconButton(
                        onPressed: _nameController.clear,
                        icon: const Icon(Icons.clear)),
                    labelText: 'Name',
                    hintText: 'input your name',
                    border: const OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 20.0),
                TextField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.email),
                    suffixIcon: IconButton(
                        onPressed: _emailController.clear,
                        icon: const Icon(Icons.clear)),
                    labelText: 'Email',
                    hintText: 'input your email',
                    border: const OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 20.0),
                TextField(
                  obscureText: true,
                  controller: _passwordController,
                  decoration: InputDecoration(
                    prefixIcon: const Icon(Icons.lock),
                    suffixIcon: IconButton(
                        onPressed: _passwordController.clear,
                        icon: const Icon(Icons.clear)),
                    labelText: 'Password',
                    hintText: 'input your password',
                    border: const OutlineInputBorder(),
                  ),
                ),
                const SizedBox(height: 20.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: <Widget>[
                    SizedBox(
                      width: 150,
                      height: 40,
                      child: FilledButton.icon(
                        label:
                            const Text('Save', style: TextStyle(fontSize: 20)),
                        icon: const Icon(Icons.save),
                        onPressed: () async {
                          final settings = AppSettings(_nameController.text,
                              _emailController.text, _passwordController.text);

                          await widget.storage.save(settings);

                          if (context.mounted) {
                            await DialogUtility.showMessageDialog(
                                context: context,
                                title: 'Message',
                                message: 'Data has saved on Local Storage.');
                          }
                        },
                      ),
                    ),
                    const SizedBox(width: 20.0),
                    SizedBox(
                      width: 150,
                      height: 40,
                      child: FilledButton.icon(
                        label: const Text('Delete',
                            style: TextStyle(fontSize: 20)),
                        icon: const Icon(Icons.delete),
                        style:
                            FilledButton.styleFrom(backgroundColor: Colors.red),
                        onPressed: () async {
                          final settings = AppSettings(_nameController.text,
                              _emailController.text, _passwordController.text);

                          await widget.storage.save(settings);

                          if (context.mounted) {
                            final result =
                                await DialogUtility.showConfirmationDialog(
                                    context: context,
                                    title: 'Confirmation',
                                    message:
                                        'Are you sure you want to delete the data?',
                                    onOk: () async {
                                      _nameController.clear();
                                      _emailController.clear();
                                      _passwordController.clear();
                                      await widget.storage.delete();
                                    });
                            if (context.mounted && result == true) {
                              await DialogUtility.showMessageDialog(
                                  context: context,
                                  title: 'Message',
                                  message:
                                      'Data has deleted on Local Storage.');
                            }
                          }
                        },
                      ),
                    )
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
