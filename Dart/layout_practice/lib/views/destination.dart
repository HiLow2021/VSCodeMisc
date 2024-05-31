import 'package:flutter/material.dart';

class Destination {
  const Destination(this.label, this.icon, this.selectedIcon);

  final String label;
  final Widget icon;
  final Widget selectedIcon;
}

const List<Destination> destinations = <Destination>[
  Destination('Page 1', Icon(Icons.widgets_outlined), Icon(Icons.widgets)),
  Destination('Page 2', Icon(Icons.widgets_outlined), Icon(Icons.widgets)),
];
