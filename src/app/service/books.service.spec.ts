import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { plainToClass } from 'class-transformer';
import { BooksResponse } from '../models/books-response.model';
import { TestBed } from '@angular/core/testing';
import { Book } from '../models/book.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('BooksService', () => {
  let httpTestingController: HttpTestingController;
  let booksService: BooksService;
  const booksObject = {books: []};
  const expectedBooks: BooksResponse = plainToClass(BooksResponse, booksObject);
  const bookObject = {_id: '1', bookId: 0, title: '', author: '', year: 0};
  const expectedBook: Book = plainToClass(Book, bookObject);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BooksService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    booksService = TestBed.get(BooksService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(booksService).toBeTruthy();
  });

  it('should call book api without query string or id path', () => {
    booksService.getBooks().subscribe(
      (books: BooksResponse) => {
        expect(books).toEqual(expectedBooks);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}?`);
    expect(req.request.method).toEqual('GET');
    req.flush(booksObject);
  });

  it('should call book api with bookId query string', () => {
    booksService.getBooks({bookId: 1}).subscribe(
      (books: BooksResponse) => {
        expect(books).toEqual(expectedBooks);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}?bookId=1&`);
    expect(req.request.method).toEqual('GET');
    req.flush(booksObject);
  });

  it('should call book api with title query string', () => {
    booksService.getBooks({title: 'War and Peace'}).subscribe(
      (books: BooksResponse) => {
        expect(books).toEqual(expectedBooks);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}?title=War and Peace&`);
    expect(req.request.method).toEqual('GET');
    req.flush(booksObject);
  });

  it('should call book api with author query string', () => {
    booksService.getBooks({author: 'Leo Tolstoy'}).subscribe(
      (books: BooksResponse) => {
        expect(books).toEqual(expectedBooks);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}?author=Leo Tolstoy&`);
    expect(req.request.method).toEqual('GET');
    req.flush(booksObject);
  });

  it('should call book api with year query string', () => {
    booksService.getBooks({year: 1869}).subscribe(
      (books: BooksResponse) => {
        expect(books).toEqual(expectedBooks);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}?year=1869`);
    expect(req.request.method).toEqual('GET');
    req.flush(booksObject);
  });

  it('should call book api with title & author query string', () => {
    booksService.getBooks({title: 'War and Peace', author: 'Leo Tolstoy'}).subscribe(
      (books: BooksResponse) => {
        expect(books).toEqual(expectedBooks);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}?title=War and Peace&author=Leo Tolstoy&`);
    expect(req.request.method).toEqual('GET');
    req.flush(booksObject);
  });

  it('should handle error if getBooks() returns an error', () => {
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    booksService.getBooks().subscribe(
      () => {}, (error: HttpErrorResponse) => {
        expect(error).toBe(returnedError);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}?`);
    expect(req.request.method).toEqual('GET');
    req.flush(returnedError);
  });

  it('should call book api with id path', () => {
    booksService.getBook('1').subscribe(
      (book: Book) => {
        expect(book).toEqual(expectedBook);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}1`);
    expect(req.request.method).toEqual('GET');
    req.flush(bookObject);
  });

  it('should handle error if getBook() returns an error', () => {
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    booksService.getBook('1').subscribe(
      () => {}, (error: HttpErrorResponse) => {
        expect(error).toBe(returnedError);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}1`);
    expect(req.request.method).toEqual('GET');
    req.flush(returnedError);
  });

  it('should POST to book api with book request body', () => {
    booksService.postBook(expectedBook).subscribe(
      (book: Book) => {
        expect(book).toEqual(expectedBook);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}`);
    expect(req.request.method).toEqual('POST');
    req.flush(bookObject);
  });

  it('should handle error if postBook() returns an error', () => {
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    booksService.postBook(expectedBook).subscribe(
      () => {}, (error: HttpErrorResponse) => {
        expect(error).toBe(returnedError);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}`);
    expect(req.request.method).toEqual('POST');
    req.flush(returnedError);
  });

  it('should PUT to book api with book request body', () => {
    booksService.putBook(expectedBook).subscribe(
      (book: Book) => {
        expect(book).toEqual(expectedBook);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}1`);
    expect(req.request.method).toEqual('PUT');
    req.flush(bookObject);
  });

  it('should handle error if putBook() returns an error', () => {
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    booksService.putBook(expectedBook).subscribe(
      () => {}, (error: HttpErrorResponse) => {
        expect(error).toBe(returnedError);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}1`);
    expect(req.request.method).toEqual('PUT');
    req.flush(returnedError);
  });

  it('should DELETE to book api with id path', () => {
    booksService.deleteBook('1').subscribe(
      (resp) => {
        expect(resp).toEqual(null);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });

  it('should handle error if deleteBook() returns an error', () => {
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    booksService.deleteBook('1').subscribe(
      () => {}, (error: HttpErrorResponse) => {
        expect(error).toBe(returnedError);
      }
    );

    const req = httpTestingController.expectOne(`${booksService.BOOKS_API_URL}1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(returnedError);
  });
});
