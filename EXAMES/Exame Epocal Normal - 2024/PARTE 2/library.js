// library.js
import { Book } from './book.js';

export class Library {
    constructor() {
        this.books = [];
        this.nextId = 1;
    }

    addBook(title, year) {
        if (this.books.some(book => book.title === title && book.year === year)) {
            throw new Error('This book already exists in the library.');
        }
        const book = new Book(this.nextId++, title, year);
        this.books.push(book);
        return book;
    }

    getBookById(id) {
        return this.books.find(book => book.id === id);
    }
}
