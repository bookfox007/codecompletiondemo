import { Book } from './Book';
import { BookManager } from './BookManager';

const bookManager = new BookManager();

bookManager.addBook(new Book(1, '1984', 'George Orwell'));
bookManager.addBook(new Book(2, 'To Kill a Mockingbird', 'Harper Lee'));

console.log('All Books:', bookManager.getBooks());

const book = bookManager.findBookById(1);
if (book) {
  console.log('Found Book:', book);
} else {
  console.log('Book not found');
}

bookManager.deleteBook(1);

console.log('After Deleting Book with ID 1:', bookManager.getBooks());
