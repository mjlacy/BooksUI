import { Book } from '../../models/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BooksResponse } from '../../models/books-response.model';
import { first, map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BooksService {
  public readonly BOOKS_API_URL = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getBooks({bookId = 0, title = '', author = '', year = 0} = {}): Observable<BooksResponse> {
    const queryString = '?' + (bookId ? `bookId=${bookId}&` : '') + (title ? `title=${title}&` : '') +
      (author ? `author=${author}&` : '') + (year ? `year=${year}` : '');

    return this.httpClient.get<BooksResponse>(`${this.BOOKS_API_URL}${queryString}`).pipe(
      first(),
      map((response: BooksResponse) => {
        return plainToClass(BooksResponse, response);
      })
    );
  }

  getBook(id: string): Observable<Book> {
    return this.httpClient.get<Book>(`${this.BOOKS_API_URL}${id}`).pipe(
      first(),
      map((response: Book) => {
        return plainToClass(Book, response);
      })
    );
  }

  postBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.BOOKS_API_URL, book, httpOptions).pipe(
      first(),
      map((response: Book) => {
        return plainToClass(Book, response);
      })
    );
  }

  putBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.BOOKS_API_URL}${book._id}`, book, httpOptions).pipe(
      first(),
      map((response: Book) => {
        return plainToClass(Book, response);
      })
    );
  }

  deleteBook(id: string): Observable<null> {
    return this.httpClient.delete<null>(`${this.BOOKS_API_URL}${id}`);
  }
}
