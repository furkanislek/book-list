// lib/utils/time_formatter.dart
String formatTimeDifference(String createdAt) {
  final now = DateTime.now();
  final createdTime = DateTime.parse(createdAt);
  final difference = now.difference(createdTime);

  if (difference.inSeconds < 60) {
    return "${difference.inSeconds} seconds ago";
  } else if (difference.inMinutes < 60) {
    return "${difference.inMinutes} minutes ago";
  } else if (difference.inHours < 24) {
    return "${difference.inHours} hours ago";
  } else if (difference.inDays < 7) {
    return "${difference.inDays} days ago";
  } else if (difference.inDays < 30) {
    return "${(difference.inDays / 7).floor()} weeks ago";
  } else if (difference.inDays < 365) {
    return "${(difference.inDays / 30).floor()} months ago";
  } else {
    return "${(difference.inDays / 365).floor()} years ago";
  }
}
