import 'dart:async';

import 'package:flutter/material.dart';

class DialogUtility {
  static Future<void> showMessageDialog(
      {required BuildContext context,
      required String title,
      required String message,
      FutureOr<void> Function()? onOk}) async {
    await showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
          title: Text(title, style: const TextStyle(fontSize: 30)),
          content: Text(message, style: const TextStyle(fontSize: 20)),
          actions: <Widget>[
            SizedBox(
              width: 100,
              height: 40,
              child: TextButton(
                onPressed: () async {
                  await onOk?.call();

                  if (context.mounted) {
                    Navigator.pop(context, true);
                  }
                },
                child: const Text(
                  'OK',
                  style: TextStyle(fontSize: 20),
                ),
              ),
            )
          ]),
    );
  }

  static Future<void> showErrorDialog(
      {required BuildContext context,
      required String title,
      required String message,
      FutureOr<void> Function()? onOk}) async {
    await showDialog(
      context: context,
      builder: (BuildContext context) => AlertDialog(
          title: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const Icon(Icons.error, size: 30.0, color: Colors.red),
              const SizedBox(width: 10),
              Text(title, style: const TextStyle(fontSize: 30)),
            ],
          ),
          content: Text(message, style: const TextStyle(fontSize: 20)),
          actions: <Widget>[
            SizedBox(
              width: 100,
              height: 40,
              child: TextButton(
                onPressed: () async {
                  await onOk?.call();

                  if (context.mounted) {
                    Navigator.pop(context, true);
                  }
                },
                child: const Text(
                  'OK',
                  style: TextStyle(fontSize: 20),
                ),
              ),
            )
          ]),
    );
  }

  static Future<bool?> showConfirmationDialog(
      {required BuildContext context,
      required String title,
      required String message,
      FutureOr<void> Function()? onOk,
      FutureOr<void> Function()? onCancel}) async {
    return await showDialog<bool>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
          title: Text(title, style: const TextStyle(fontSize: 30)),
          content: Text(message, style: const TextStyle(fontSize: 20)),
          actions: <Widget>[
            SizedBox(
              width: 100,
              height: 40,
              child: TextButton(
                onPressed: () async {
                  await onOk?.call();

                  if (context.mounted) {
                    Navigator.pop(context, true);
                  }
                },
                child: const Text(
                  'OK',
                  style: TextStyle(fontSize: 20),
                ),
              ),
            ),
            SizedBox(
              width: 100,
              height: 40,
              child: TextButton(
                onPressed: () async {
                  await onCancel?.call();

                  if (context.mounted) {
                    Navigator.pop(context, false);
                  }
                },
                child: const Text(
                  'Cancel',
                  style: TextStyle(fontSize: 20),
                ),
              ),
            )
          ]),
    );
  }

  static Future<void> showProgressDialog(
      {required BuildContext context,
      required String title,
      required String message,
      FutureOr<void> Function()? task,
      FutureOr<void> Function()? onCancel}) async {
    await showDialog(
        context: context,
        builder: (BuildContext context) {
          Future.sync(() async {
            await task?.call();
          }).then((_) async {
            if (context.mounted) {
              Navigator.pop(context, true);
            }
          });

          return SimpleDialog(
              title: Text(title, style: const TextStyle(fontSize: 30)),
              children: <Widget>[
                Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const SizedBox(height: 20),
                    const SizedBox(
                      height: 40,
                      width: 40,
                      child: CircularProgressIndicator(),
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        SizedBox(
                          width: 100,
                          height: 40,
                          child: TextButton(
                            onPressed: () async {
                              await onCancel?.call();

                              if (context.mounted) {
                                Navigator.pop(context, true);
                              }
                            },
                            child: const Text(
                              'Cancel',
                              style: TextStyle(fontSize: 20),
                            ),
                          ),
                        ),
                        const SizedBox(width: 20)
                      ],
                    )
                  ],
                )
              ]);
        });
  }
}
