import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books-service/books.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  book = new Book();

  constructor(private bookService: BooksService, private router: Router) {}

  onSubmit(): void {
    this.bookService.postBook(this.book)
      .subscribe(() => {
        this.router.navigate(['/']);
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
    );
  }
}
