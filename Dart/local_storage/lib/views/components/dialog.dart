import 'package:flutter/material.dart';

class DialogUtility {
  static Future<void> showMessageDialog(
      {required BuildContext context,
      required String message,
      Future<void> Function()? onOk}) async {
    await showDialog(
      context: context,
      builder: (BuildContext context) => Dialog(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                message,
                style: const TextStyle(fontSize: 20),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  SizedBox(
                    width: 100,
                    height: 40,
                    child: TextButton(
                      onPressed: () async {
                        await onOk?.call();

                        if (context.mounted) {
                          Navigator.pop(context);
                        }
                      },
                      child: const Text(
                        'OK',
                        style: TextStyle(fontSize: 20),
                      ),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  static Future<bool?> showConfirmationDialog(
      {required BuildContext context,
      required String message,
      Future<void> Function()? onOk,
      Future<void> Function()? onCancel}) async {
     return await showDialog<bool>(
      context: context,
      builder: (BuildContext context) => Dialog(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                message,
                style: const TextStyle(fontSize: 20),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
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
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
