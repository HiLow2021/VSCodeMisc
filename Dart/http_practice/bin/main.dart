import 'package:http/http.dart' as http;

Future main() async {
  try {
    var url = Uri.parse('https://pub.dev/packages/http');
    var response = await http.get(url);

    if (response.statusCode == 200) {
      print(response.body);
    } else {
      print('Request failed with status: ${response.statusCode}.');
    }
  } catch (e) {
    print(e);
  }
}
