function Library(books = []) {
    this.books = [];
    this.container = this.render();

    books.forEach(book => book.addToLibrary(this));
}

Library.prototype.render = function() {
    const libraryContainer = document.createElement("div");
    libraryContainer.id = "library";
    document.body.appendChild(libraryContainer);

    return libraryContainer;
}

Library.prototype.addBook = function(book) {
    this.books.push(book);
    book.container = book.render();
};

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.render = function() {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
        <h3>${this.title}</h3>
        <p>Author: ${this.author}</p>
        <p>Pages: ${this.pages}</p>
        <p>Read: ${this.read ? "Yes" : "No"}</p>
    `;
    this.library.container.appendChild(bookCard);

    return bookCard;
};

Book.prototype.addToLibrary = function(library = library) {
    this.library = library;
    this.library.addBook(this);
};

const exampleBooks = [
    new Book("1984", "George Orwell", 328, true),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
    new Book("Moby Dick", "Herman Melville", 585, false),
];

const library = new Library(exampleBooks);