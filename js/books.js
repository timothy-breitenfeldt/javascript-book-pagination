"use strict";

class Book {
  constructor(isbn, title, author) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
  }

  toString() {
    return `${this.isbn} - ${this.Book} by ${this.author}`;
  }
}

const books = [
  new Book(1234, "Harry Potter and the Goblet of Fire", "J.K. Rolling"),
  new Book(1235, "Hunger Games", "Suzanne Collins"),
  new Book(1236, "The Blade Itself", "Joe Abercrombie"),
  new Book(5325, "Cold Iron", "Miles Camoran"),
  new Book(7182873, "The Dark Forge", "Miles Camoran"),
  new Book(3957538, "Bright Steal", "Miles Camoran"),
  new Book(53134, "Promise of Blood", "Brian McClellan"),
  new Book(532351, "The Crimson Campaign", "Brian McClellan"),
  new Book(528036, "The Autumn Republic", "Brian McClellan"),
  new Book(33521, "The Lives of Loc Lamora", "Scott Linch"),
  new Book(153643, "Red Seas Under Red Skys", "Scott Linch"),
  new Book(882721, "The Republic of Thieves", "Scott Linch"),
  new Book(89818, "Criss Cross", "James Patterson"),
  new Book(93028, "Run Alex Cross", "James Patterson"),
  new Book(6346322, "The Wolf of the North", "Dunkin Hamlton"),
  new Book(518384709, "The Eye of the World", "Robert Jordan"),
  new Book(583762183, "Game of Thrones", "George Martin"),
  new Book(82889384, "The Martion", "Andy Weer"),
  new Book(90028474, "Permanent Record", "Edward Snowden"),
  new Book(9084726, "The Waking Fire", "Anthony Ryan")
];
