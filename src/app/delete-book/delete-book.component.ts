import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BooksService } from '../service/books.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  book = new Book();

  constructor(private route: ActivatedRoute, private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = this.route.snapshot.paramMap.get('_id');

    this.bookService.getBook(id)
      .subscribe(book => this.book = book,
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.book._id)
      .subscribe(() => {
          this.goHome();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
