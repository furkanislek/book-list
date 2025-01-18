import 'package:fltter/utils/time_formatter.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class DiscoverScreen extends StatefulWidget {
  const DiscoverScreen({Key? key}) : super(key: key);

  @override
  _DiscoverScreenState createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen> {
  List<dynamic> quotes = [];
  List<bool> isExpanded = [];
  @override
  void initState() {
    super.initState();
    fetchQuotes();
  }

  Future<void> fetchQuotes() async {
    final url = Uri.parse('http://10.0.2.2:5001/api/quotes');

    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          quotes = data;
          isExpanded = List.generate(quotes.length, (index) => false);
        });
      } else {
        print("API request failed with status: ${response.statusCode}");
      }
    } catch (e) {
      print("Error fetching data: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final height = MediaQuery.of(context).size.height;
    print("Width : -------------------------");
    print(width);
    print(height);
    return Scaffold(
      body: ListView.builder(
        itemCount: quotes.length,
        itemBuilder: (context, index) {
          final quote = quotes[index];
          return Padding(
            padding: EdgeInsets.symmetric(
                horizontal: width / 30, vertical: height / 118),
            child: Card(
              color: const Color.fromARGB(255, 254, 243, 243),
              elevation: 1,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16.0),
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
                      SizedBox(
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              flex: 2,
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    quote['userName'],
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    formatTimeDifference(quote['createdAt']),
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(height: height / 79),
                      Text(
                        isExpanded[index]
                            ? '"${quote['description']}"'
                            : quote['description'].length > 250
                                ? '${quote['description'].substring(0, 250)}...'
                                : '"${quote['description']}"',
                        style: const TextStyle(
                          fontSize: 16,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                      if (!isExpanded[index] &&
                          quote['description'].length > 250)
                        const Text(
                          'Tap to read more...',
                          style: TextStyle(
                            color: Colors.blue,
                            fontSize: 14,
                          ),
                        ),
                      if (quote['bookImage'] != null)
                        Padding(
                          padding: EdgeInsets.only(top: height / 70),
                          child: Row(
                            children: [
                              Image.network(
                                quote['bookImage'],
                                height: height / 19,
                                width: width / 13,
                                fit: BoxFit.cover,
                              ),
                              SizedBox(width: width / 55),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    quote['title'],
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    quote['bookAuthor'],
                                    style: const TextStyle(
                                      color: Colors.grey,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      SizedBox(height: height / 118),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              IconButton(
                                onPressed: () {},
                                icon: const Icon(Icons.favorite_border),
                              ),
                              Text(quote['favoriCount'].toString()),
                            ],
                          ),
                          Row(
                            children: [
                              IconButton(
                                onPressed: () {},
                                icon: const Icon(Icons.comment),
                              ),
                              Text(quote["comments"].length.toString())
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
