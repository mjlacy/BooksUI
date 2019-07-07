import { Component, OnInit } from '@angular/core';
import { Book } from '../model/model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Array<Book>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books.books,
        error => {
          console.error(`Error: ${error}`);
        }
      );
  }
}
