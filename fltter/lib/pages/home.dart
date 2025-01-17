import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Book List'),
            IconButton(onPressed: () {}, icon: Icon(Icons.logout))
          ],
        ),
      ),
      body: Center(child: Text("Home")),
    );
  }
}
