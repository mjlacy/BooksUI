export class Book {
  public _id: string;
  public bookId: number;
  public title: string;
  public author: string;
  public year: number;

  constructor(id?: string, bookId?: number, title?: string, author?: string, year?: number) {
    this._id = id;
    this.bookId = bookId;
    this.title = title;
    this.author = author;
    this.year = year;
  }
}
