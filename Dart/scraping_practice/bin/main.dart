import 'dart:io';
import 'package:universal_html/controller.dart';

Future main() async {
  final url = Uri.parse("https://news.ycombinator.com/");
  final controller = WindowController();

  await controller.openHttp(
    method: 'GET',
    uri: url,
    onRequest: (HttpClientRequest request) {
      request.headers.set('Authorization', 'headerValue');
      request.cookies.add(Cookie('cookieName', 'cookieValue'));
    },
    onResponse: (HttpClientResponse response) {
      print('Status code: ${response.statusCode}');
    },
  );

  final titleElements =
      controller.window.document.querySelectorAll(".athing > .title");
  final topStoryTitle = titleElements.first.text;

  print("Top Hacker News story is: $topStoryTitle");
}
