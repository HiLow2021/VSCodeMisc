import 'package:test/test.dart';

import 'package:console/lib.dart';

void main() {
  group('lib', () {
    test('hello', () {
      expect(hello(), 'Hello Dart Console Application!');
    });

    test('add', () {
      expect(add(8, 2), 10);
    });

    test('sub', () {
      expect(sub(8, 2), 6);
    });

    test('mul', () {
      expect(mul(8, 2), 16);
    });

    test('div', () {
      expect(div(8, 2), 4);
    });
  });
}
