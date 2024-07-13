import { Book } from '../src/Book';
import { BookManager } from '../src/BookManager';

describe('BookManager', () => {
  let bookManager: BookManager;

  beforeEach(() => {
    bookManager = new BookManager();
  });

  test('should add a book', () => {
    const book = new Book(1, '1984', 'George Orwell');
    bookManager.addBook(book);
    expect(bookManager.getBooks()).toContainEqual(book);
  });

  test('should delete a book', () => {
    const book1 = new Book(1, '1984', 'George Orwell');
    const book2 = new Book(2, 'To Kill a Mockingbird', 'Harper Lee');
    bookManager.addBook(book1);
    bookManager.addBook(book2);
    bookManager.deleteBook(1);
    expect(bookManager.getBooks()).not.toContainEqual(book1);
    expect(bookManager.getBooks()).toContainEqual(book2);
  });

  test('should find a book by ID', () => {
    const book = new Book(1, '1984', 'George Orwell');
    bookManager.addBook(book);
    expect(bookManager.findBookById(1)).toEqual(book);
  });

  test('should return undefined if book not found', () => {
    expect(bookManager.findBookById(999)).toBeUndefined();
  });
});
