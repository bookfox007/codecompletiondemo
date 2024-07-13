export interface Book {
  id: number;
  title: string;
  author: string;
}

export class Book implements Book {
  constructor(public id: number, public title: string, public author: string) {}
}
