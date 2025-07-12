function Library(books = []) {
    this.books = books;
}

Library.prototype.addBook = function(book) {
    this.books.push(book);
};

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.addToLibrary = function(library) {
    library.addBook(this);
};

const exampleBooks = [
    new Book("1984", "George Orwell", 328, true),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
    new Book("Moby Dick", "Herman Melville", 585, false),
];

const library = new Library(exampleBooks);