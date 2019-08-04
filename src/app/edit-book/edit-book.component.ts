import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BooksService } from '../service/books.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  book = new Book();

  constructor(private route: ActivatedRoute, private bookService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    const id = this.route.snapshot.paramMap.get('_id');

    this.bookService.getBook(id)
      .subscribe((book: Book) => this.book = book,
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  onSubmit(): void {
    this.bookService.putBook(this.book)
      .subscribe(() => {
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
