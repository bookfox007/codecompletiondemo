//创建书籍评论接口
export interface Comment {
  id: number;
  bookId: number;
  username: string;
  content: string;
  star: number;
  created: Date;
}

//创建书籍评论类
export class Comment implements Comment {
  constructor(
    public id: number,
    public bookId: number,
    public username: string,
    public content: string,
    public star: number,
    public created: Date
  ) {}
}


