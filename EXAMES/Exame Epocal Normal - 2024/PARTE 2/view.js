// view.js
import { Library } from './library.js';

document.addEventListener('DOMContentLoaded', function() {
    const bookTitleInput = document.getElementById('book-title');
    const bookYearInput = document.getElementById('book-year');
    const bookIdInput = document.getElementById('book-id');
    const addButton = document.getElementById('add-button');
    const reserveButton = document.getElementById('reserve-button');
    const deliverButton = document.getElementById('deliver-button');
    const bookList = document.getElementById('book-list');

    const library = new Library();

    addButton.addEventListener('click', function() {
        const bookTitle = bookTitleInput.value.trim();
        const bookYear = bookYearInput.value.trim();

        if (bookTitle && bookYear) {
            try {
                library.addBook(bookTitle, bookYear);
                renderBooks();
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert('Please fill in both book title and publication year.');
        }
    });

    reserveButton.addEventListener('click', function() {
        const bookId = parseInt(bookIdInput.value.trim(), 10);
        const book = library.getBookById(bookId);
        if (book) {
            if (!book.reserved) {
                book.reserve();
                renderBooks();
            } else {
                alert('This book is already reserved.');
            }
        } else {
            alert('No book found with this ID.');
        }
    });

    deliverButton.addEventListener('click', function() {
        const bookId = parseInt(bookIdInput.value.trim(), 10);
        const book = library.getBookById(bookId);
        if (book) {
            if (book.reserved) {
                book.deliver();
                renderBooks();
            } else {
                alert('This book is not reserved.');
            }
        } else {
            alert('No book found with this ID.');
        }
    });

    function renderBooks() {
        bookList.innerHTML = '';
        library.books.forEach(book => {
            const bookItem = document.createElement('li');
            bookItem.textContent = `ID: ${book.id}, Title: ${book.title}, Year: ${book.year}, Reserved: ${book.reserved ? 'Yes' : 'No'}`;
            bookList.appendChild(bookItem);
        });
    }
});
