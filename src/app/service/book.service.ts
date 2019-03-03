import { Book } from '../model/model';
import { ConfigService } from '../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class BookService {
  private readonly BOOKS_API_URL = this.configService.config.url;
  book: Book;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  getBooks(): Observable<any> {
    return this.httpClient.get (
      this.BOOKS_API_URL,
      httpOptions
    );
  }

  getBook(id: string): Observable<any> {
    return this.httpClient.get (
      `${this.BOOKS_API_URL}/${id}`,
      httpOptions
    );
  }

  postBook(book: Book): Observable<any> {
    return this.httpClient.post(
      this.BOOKS_API_URL,
      book,
      httpOptions
    );
  }

  putBook(book: Book): Observable<any> {
    return this.httpClient.put(
      `${this.BOOKS_API_URL}/${book._id}`,
      book,
      httpOptions
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.httpClient.delete(
      `${this.BOOKS_API_URL}/${id}`,
      httpOptions
    );
  }
}
