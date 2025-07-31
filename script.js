class Library {
  #node = document.querySelector("#books");
  #books = {};

  constructor(books = []) {
    books.forEach((book) => this.addBook(book));

    this.#node.addEventListener("click", ({ target }) => {
      const bookCard = target.closest(".book-card");
      if (!bookCard) return;
      const bookId = bookCard.dataset.id;
      const book = this.#books[bookId];

      switch (target.dataset.action) {
        case "remove":
          this.removeBook(book);
          break;
        case "toggle-read":
          book.toggleRead();
          break;
      }
    });
  }

  addBook(book) {
    this.#books[book.id] = book;
    this.#node.appendChild(book.node);
  }

  removeBook(book) {
    delete this.#books[book.id];
    book.node.remove();
  }
}

class Book {
  #id = crypto.randomUUID();

  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.node = this.#buildNode();
  }

  get template() {
    return `
      <header class="book-header">
        <h2 class="book-title">${this.title}</h2>
      </header>
      <table class="book-data">
        <tbody>
          <colgroup>
            <col style="width: 8ch" />
            <col style="width: 1fr" />
          </colgroup>
          <tr data-field="author">
            <th>Author</th>
            <td>${this.author}</td>
          </tr>
          <tr data-field="pages">
            <th>Pages</th>
            <td>${this.pages}</td>
          </tr>
          <tr data-field="read">
            <th>Read</th>
            <td>
              <input class="checkbox" data-action="toggle-read" type="checkbox" ${
                this.read ? "checked" : ""
              } />
            </td>
          </tr>
        </tbody>
      </table>
      <footer class="book-actions">
        <button class="button" data-action="toggle-read">${
          this.read ? "Mark unread" : "Mark read"
        }</button>
        <button class="button" data-action="remove">Remove</button>
      </footer>
    `;
  }

  get id() {
    return this.#id;
  }

  #buildNode() {
    const node = document.createElement("div");
    node.className = "book-card";
    node.dataset.id = this.#id;
    node.innerHTML = this.template;
    return node;
  }

  toggleRead() {
    this.read = !this.read;

    const checkbox = this.node.querySelector(".checkbox");
    checkbox.checked = this.read;

    const button = this.node.querySelector(
      ".button[data-action='toggle-read']"
    );
    button.textContent = this.read ? "Mark unread" : "Mark read";
  }
}

const EXAMPLE_BOOKS = [
  new Book("1984", "George Orwell", 328, true),
  new Book("To Kill a Mockingbird", "Harper Lee", 281, false),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
  new Book("Moby Dick", "Herman Melville", 585, false),
];

class BookDialog {
  #node = document.querySelector("#dialog");

  #form = document.querySelector("#form");
  #modalOpenBtn = document.querySelector("#modal-open-btn");
  #modalCloseBtn = document.querySelector("#modal-close-btn");

  #library;

  constructor(library) {
    this.#library = library;

    this.#modalOpenBtn.addEventListener("click", () => this.#node.showModal());
    this.#modalCloseBtn.addEventListener("click", () => {
      this.#node.close();
      this.#form.reset();
    });

    this.#form.addEventListener("submit", (event) => this.#handleSubmit(event));
  }

  #handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(this.#form);
    const newBook = new Book(
      formData.get("title"),
      formData.get("author"),
      Number(formData.get("pages")),
      formData.get("read") === "on"
    );

    this.#library.addBook(newBook);
    this.#node.close();
    this.#form.reset();
  }
}

const library = new Library(EXAMPLE_BOOKS);
const addBookDialog = new BookDialog(library);
