import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<Map<String, dynamic>> quotes = [
    {
      'user': 'Sarah Mitchell',
      'time': '2 hours ago',
      'quote':
          'The only way to do great work is to love what you do.The only way to do great work is to love what you do.The only way to do great work is to love what you do.The only way to do great work is to love what you do.The only way to do great work is to love what you do.The only way to do great work is to love what you do.The only way to do great work is to love what you do.The only way to do great work is to love what you do.',
      'bookTitle': 'Steve Jobs: The Biography',
      'author': 'Walter Isaacson',
      'image': 'https://picsum.photos/200',
      'likes': 120,
      'comments': 45,
    },
    {
      'user': 'Alex Turner',
      'time': '5 hours ago',
      'quote':
          'It is our choices that show what we truly are, far more than our abilities. This is a very long quote to demonstrate the ellipsis functionality and how it can be expanded on tap.',
      'bookTitle': 'Harry Potter and the Chamber of Secrets',
      'author': 'J.K. Rowling',
      'image': 'https://picsum.photos/200',
      'likes': 189,
      'comments': 24,
    },
    {
      'user': 'Alex Turner',
      'time': '5 hours ago',
      'quote':
          'It is our choices that show what we truly are, far more than our abilities. This is a very long quote to demonstrate the ellipsis functionality and how it can be expanded on tap.',
      'bookTitle': 'Harry Potter and the Chamber of Secrets',
      'author': 'J.K. Rowling',
      'image': 'https://picsum.photos/200',
      'likes': 189,
      'comments': 24,
    },
  ];

  final List<bool> isExpanded = [];

  @override
  void initState() {
    super.initState();
    // Initialize the expansion state for each card
    isExpanded.addAll(List.generate(quotes.length, (index) => false));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: quotes.length,
        itemBuilder: (context, index) {
          final quote = quotes[index];
          return Padding(
            padding:
                const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Card(
              color: const Color.fromARGB(255, 254, 243, 243),
              elevation: 2,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12.0),
              ),
              child: InkWell(
                onTap: () {
                  setState(() {
                    isExpanded[index] = !isExpanded[index];
                  });
                },
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          CircleAvatar(
                            backgroundColor: Colors.grey[300],
                            radius: 20,
                            child: Text(
                              quote['user'][0],
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                quote['user'],
                                style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              Text(
                                quote['time'],
                                style: const TextStyle(
                                  fontSize: 12,
                                  color: Colors.grey,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Text(
                        isExpanded[index]
                            ? '"${quote['quote']}"'
                            : quote['quote'].length > 250
                                ? '"${quote['quote'].substring(0, 250)}...'
                                : '"${quote['quote']}"',
                        style: const TextStyle(
                          fontSize: 16,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                      if (!isExpanded[index] && quote['quote'].length > 250)
                        const Text(
                          'Tap to read more...',
                          style: TextStyle(
                            color: Colors.blue,
                            fontSize: 14,
                          ),
                        ),
                      if (quote['image'] != null)
                        Padding(
                          padding: const EdgeInsets.only(top: 8.0),
                          child: Row(
                            children: [
                              Image.network(
                                quote['image'],
                                height: 50,
                                width: 35,
                                fit: BoxFit.cover,
                              ),
                              const SizedBox(width: 8),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    quote['bookTitle'],
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    quote['author'],
                                    style: const TextStyle(
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      const SizedBox(height: 8),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              IconButton(
                                onPressed: () {},
                                icon: const Icon(Icons.favorite_border),
                              ),
                              Text(quote['likes'].toString()),
                            ],
                          ),
                          Row(
                            children: [
                              IconButton(
                                onPressed: () {},
                                icon: const Icon(Icons.comment),
                              ),
                              Text(quote['comments'].toString()),
                            ],
                          ),
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(Icons.bookmark_border),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
