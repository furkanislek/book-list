import 'package:fltter/components/discover/add_quoter_modal.dart';
import 'package:fltter/components/discover/discover.dart';
import 'package:fltter/components/mylist/my_list.dart';
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int currentIndex = 1;

  final List<Widget> pages = [
    const HomeScreen(),
    const DiscoverScreen(),
    MyListScreen(),
    const LibraryScreen(),
    const ProfileScreen(),
  ];

  void showOptionsModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.format_quote),
              title: const Text('Quotes'),
              onTap: () {
                Navigator.pop(context); // Modal'ı kapat
                showQuoteModal(context);
              },
            ),
            ListTile(
              leading: const Icon(Icons.menu_book),
              title: const Text('My Books'),
              onTap: () {
                Navigator.pop(context); // Modal'ı kapat
                // My Books modal işlemi buraya eklenebilir
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Book List'),
            IconButton(
              onPressed: () => showOptionsModal(context),
              icon: const Icon(Icons.add_circle_outline),
            ),
          ],
        ),
      ),
      body: IndexedStack(
        index: currentIndex,
        children: pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: currentIndex,
        onTap: (index) {
          setState(() {
            currentIndex = index; // Tıklanan sekmeyi aktif yap
          });
        },
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Discover',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.library_books),
            label: 'My List',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.menu_book),
            label: 'Library',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        type: BottomNavigationBarType.fixed,
        selectedItemColor: Colors.deepPurple,
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Home Screen'),
    );
  }
}

class LibraryScreen extends StatelessWidget {
  const LibraryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Library Screen'),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text('Profile Screen'),
    );
  }
}
