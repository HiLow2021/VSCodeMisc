import 'dart:convert';

dynamic deepCopy(dynamic source) {
  final jsonString = jsonEncode(source);
  final copy = jsonDecode(jsonString);

  return copy;
}
