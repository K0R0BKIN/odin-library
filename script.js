function Library(books = []) {
  this.node = document.querySelector("#books");
  this.books = [];

  books.forEach((book) => this.addBook(book));
}

Library.prototype.addBook = function (book) {
  this.books.push(book);
  this.node.appendChild(book.node);
};

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();

  this.node = document.createElement("div");
  this.node.className = "book-card";
  this.node.innerHTML = `
        <h3>${this.title}</h3>
        <p>Author: ${this.author}</p>
        <p>Pages: ${this.pages}</p>
        <label>
            Read: <span>${this.read ? "☑" : "☐"}</span>
        </label>
    `;
}

const EXAMPLE_BOOKS = [
  new Book("1984", "George Orwell", 328, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("Moby Dick", "Herman Melville", 585, false),
];

const library = new Library(EXAMPLE_BOOKS);

function AddBookDialog(library) {
  this.node = document.querySelector("#dialog");

  this.modalOpenBtn = document.querySelector("#modal-open-btn");
  this.modalOpenBtn.addEventListener("click", () => {
    this.node.showModal();
  });

  this.modalCloseBtn = document.querySelector("#modal-close-btn");
  this.modalCloseBtn.addEventListener("click", () => {
    this.node.close();
    this.form.reset();
  });

  this.form = document.querySelector("#form");
  this.form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(this.form);
    const newBook = new Book(
      formData.get("title"),
      formData.get("author"),
      Number(formData.get("pages")),
      formData.get("read") === "on",
    );

    library.addBook(newBook);
    this.node.close();
    this.form.reset();
  });
}

const addBookDialog = new AddBookDialog(library);