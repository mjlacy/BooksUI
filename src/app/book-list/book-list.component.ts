import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../service/books.service';
import { BooksResponse } from '../models/books-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Array<Book>;

  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe((books: BooksResponse) => this.books = books.books,
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
