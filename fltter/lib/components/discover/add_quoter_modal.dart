import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> showQuoteModal(BuildContext context) async {
  final TextEditingController titleController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final TextEditingController searchController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  final width = MediaQuery.of(context).size.width;
  final height = MediaQuery.of(context).size.height;

  List<dynamic> searchResults = [];
  String? bookId;

  Future<void> fetchBooks(String query) async {
    if (query.isEmpty) {
      searchResults.clear();
      return;
    }
    final encodedQuery = Uri.encodeQueryComponent(query);
    try {
      final response = await http.get(
        Uri.parse(
          'http://10.0.2.2:5001/api/book/search/$encodedQuery?page=1&pageSize=5&shouldMatchAll=0&language=tr',
        ),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        searchResults = data['books'];
      } else {
        searchResults.clear();
      }
    } catch (e) {
      searchResults.clear();
    }
  }

  Future<void> submitForm() async {
    if (formKey.currentState?.validate() ?? false) {
      try {
        final response = await http.post(
          Uri.parse('http://10.0.2.2:5001/api/quotes/add'),
          headers: {
            'Content-Type': 'application/json',
          },
          body: json.encode({
            'title': titleController.text,
            'userName': 'mordad38',
            'description': descriptionController.text,
            'bookId': bookId
          }),
        );

        if (response.statusCode == 201) {
          Navigator.of(context).pop();
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Quote successfully added!')),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Failed to add the quote')),
          );
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('An error occurred')),
        );
      }
    }
  }

  showDialog(
    context: context,
    builder: (context) {
      return StatefulBuilder(
        builder: (context, setState) {
          return AlertDialog(
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Add New Quote'),
                    IconButton(
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                      icon: const Icon(Icons.close),
                    ),
                  ],
                ),
                const Divider(
                  color: Colors.grey,
                  thickness: 1,
                ),
              ],
            ),
            content: SingleChildScrollView(
              child: SizedBox(
                width: width / 1.1,
                height: height * 0.6,
                child: Form(
                  key: formKey,
                  child: Column(
                    children: [
                      TextFormField(
                        controller: titleController,
                        decoration: InputDecoration(
                          labelText: 'Title',
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8.0)),
                        ),
                        validator: (value) {
                          if (value?.isEmpty ?? true) {
                            return 'Title is required';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 12),
                      TextFormField(
                        controller: descriptionController,
                        maxLines: 3,
                        decoration: const InputDecoration(
                          labelText: 'Description',
                          border: OutlineInputBorder(),
                        ),
                        validator: (value) {
                          if (value?.isEmpty ?? true) {
                            return 'Description is required';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 12),
                      TextField(
                        controller: searchController,
                        onChanged: (query) async {
                          await fetchBooks(query);
                          setState(() {}); // Update the UI
                        },
                        decoration: InputDecoration(
                          labelText: 'Search Book',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8.0),
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Expanded(
                        child: ListView.builder(
                          shrinkWrap: true,
                          itemCount: searchResults.length,
                          itemBuilder: (context, index) {
                            final book = searchResults[index];
                            return ListTile(
                              leading: book['image'] != null
                                  ? Image.network(
                                      book['image'],
                                      width: 40,
                                      height: 60,
                                      fit: BoxFit.cover,
                                    )
                                  : const Icon(Icons.book),
                              title: Text(book['title']),
                              subtitle: Text(
                                  book['publisher'] ?? 'Unknown Publisher'),
                              trailing: ElevatedButton(
                                onPressed: () {
                                  bookId = book['isbn13'];
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                        content:
                                            Text('Selected Book ID: $bookId')),
                                  );
                                },
                                child: const Text('Select'),
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                child: const Text("Cancel"),
              ),
              TextButton(
                onPressed: () {
                  submitForm();
                },
                child: const Text("OK"),
              ),
            ],
          );
        },
      );
    },
  );
}
