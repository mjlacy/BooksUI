import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Book} from '../model/model';
import {ConfigService} from '../config.service';

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
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application-json')
      }
    );
  }

  getBook(_id): Observable<any> {
    return this.httpClient.get (
      this.BOOKS_API_URL + '/' + _id,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application-json')
      }
    );
  }

  postBook(book: Book): Observable<any> {
    return this.httpClient.post(
      this.BOOKS_API_URL,
      book,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application-json')
      }
    );
  }

  putBook(book: Book): Observable<any> {
    return this.httpClient.put(
      this.BOOKS_API_URL + '/' + book._id,
      book,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application-json')
      }
    );
  }

  deleteBook(_id): Observable<any> {
    return this.httpClient.delete(
      this.BOOKS_API_URL + '/' + _id,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application-json')
      }
    );
  }
}
