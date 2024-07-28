// book.js
export class Book {
    constructor(id, title, year) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.reserved = false;
    }

    reserve() {
        this.reserved = true;
    }

    deliver() {
        this.reserved = false;
    }
}
