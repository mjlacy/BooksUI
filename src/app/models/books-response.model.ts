import { Book } from './book.model';
import { Type } from 'class-transformer';

export class BooksResponse {
  @Type(() => Book)
  books: Book[];
}
