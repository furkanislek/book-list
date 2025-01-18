import 'package:flutter/material.dart';

class MyListScreen extends StatefulWidget {
  const MyListScreen({Key? key}) : super(key: key);
  @override
  _MyListScreenState createState() => _MyListScreenState();
}

class _MyListScreenState extends State<MyListScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Currently Reading Section
            const Text(
              "Currently Reading",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  Container(
                    height: 100,
                    width: 60,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      image: const DecorationImage(
                        image: NetworkImage(
                            "https://upload.wikimedia.org/wikipedia/en/a/a0/DuneCover.jpg"),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          "Dune",
                          style: TextStyle(
                              fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const Text("Frank Herbert"),
                        const SizedBox(height: 8),
                        LinearProgressIndicator(
                          value: 0.75,
                          backgroundColor: Colors.grey[300],
                          color: Colors.blueGrey,
                        ),
                        const SizedBox(height: 4),
                        const Text("75% - 328/412 pages"),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Statistics Section
            const Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Column(
                  children: [
                    Text(
                      "12",
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    Text("Books Read"),
                  ],
                ),
                Column(
                  children: [
                    Text(
                      "47",
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    Text("Saved Quotes"),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Reading List Section
            const Text(
              "Reading List",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: MyList(
                items: const [
                  {
                    "title": "Project Hail Mary",
                    "author": "Andy Weir",
                    "imageUrl":
                        "https://m.media-amazon.com/images/I/91dSMhdIzTL.jpg",
                  },
                  {
                    "title": "The Midnight Library",
                    "author": "Matt Haig",
                    "imageUrl":
                        "https://m.media-amazon.com/images/I/81kpY2uG7yL.jpg",
                  },
                  {
                    "title": "Atomic Habits",
                    "author": "James Clear",
                    "imageUrl":
                        "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
                  },
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// MyList Component
class MyList extends StatelessWidget {
  final List<Map<String, String>> items;

  MyList({required this.items});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: items.length,
      itemBuilder: (context, index) {
        final item = items[index];
        return BookCard(
          title: item["title"]!,
          author: item["author"]!,
          imageUrl: item["imageUrl"]!,
        );
      },
    );
  }
}

// BookCard Component
class BookCard extends StatelessWidget {
  final String title;
  final String author;
  final String imageUrl;

  BookCard({required this.title, required this.author, required this.imageUrl});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 120,
      margin: const EdgeInsets.only(right: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 150,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              image: DecorationImage(
                image: NetworkImage(imageUrl),
                fit: BoxFit.cover,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          Text(
            author,
            style: TextStyle(fontSize: 12, color: Colors.grey[600]),
          ),
        ],
      ),
    );
  }
}
