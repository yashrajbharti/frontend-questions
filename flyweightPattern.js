// Structural Pattern
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

const books = new Map();
const bookList = [];

const addBook = (title, author, isbn, availability, sales) => {
  const book = {
    ...createBook(title, author, isbn),
    sales,
    availability,
    isbn,
  };

  bookList.push(book);
  return book;
};

const createBook = (title, author, isbn) => {
  const existingBook = books.has(isbn);

  if (existingBook) {
    return books.get(isbn);
  }

  const book = new Book(title, author, isbn);
  books.set(isbn, book);

  return book;
};

addBook("To Kill a Mockingbird", "Harper Lee", "CD345", false, 20);
addBook("The Great Gatsby", "F. Scott Fitzgerald", "EF567", false, 20);

console.log("Total amount of copies: ", bookList.length);
console.log("Total amount of books: ", books.size);

// Structural Pattern
// Flyweight example with rendering 3D trees

class TreeType {
  constructor(name, color, texture) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  display(x, y) {
    console.log(
      `Drawing ${this.name} tree at (${x}, ${y}) with ${this.color} color.`
    );
  }
}

class TreeFactory {
  constructor() {
    this.treeTypes = new Map();
  }

  getTreeType(name, color, texture) {
    const key = `${name}-${color}-${texture}`;
    if (!this.treeTypes.has(key)) {
      this.treeTypes.set(key, new TreeType(name, color, texture));
    }
    return this.treeTypes.get(key);
  }
}

class Tree {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  display() {
    this.type.display(this.x, this.y);
  }
}

const treeFactory = new TreeFactory();
const trees = [];

for (let i = 0; i < 100000; i++) {
  const treeType = treeFactory.getTreeType("Oak", "Green", "Rough");
  trees.push(new Tree(Math.random() * 100, Math.random() * 100, treeType));
}

// Render trees
trees.forEach((tree) => tree.display());
