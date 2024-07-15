import { Book } from './Book';

export class BookManager {
  private books: Book[] = [];
  private comments: Comment[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  getBooks(): Book[] {
    return this.books;
  }

  findBookById(bookId: number): Book | undefined {
    return this.books.find(book => book.id === bookId);
  }

  deleteBook(bookId: number): boolean {
    const index = this.books.findIndex(book => book.id === bookId);
    if (index !== -1) {
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }


}
