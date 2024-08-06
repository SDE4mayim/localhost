import 'package:flutter/material.dart';
import 'login_screen.dart';

void main() {
  runApp(const VetCastle());
}


class VetCastle extends StatelessWidget {
  const VetCastle({Key? key}) : super(key: key);

  static const String _title = 'Vet Castle';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      home: Scaffold(
        appBar: AppBar(title: const Text(_title)),
        body: const LoginScreen(),
      ),
    );
  }
}
