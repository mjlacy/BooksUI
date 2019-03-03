import { Component } from '@angular/core';
import { Book } from '../model/model';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  book = new Book();

  constructor(private bookService: BookService, private router: Router) { }

  onSubmit(): void {
    this.bookService.postBook(this.book)
      .subscribe(() => {
        this.router.navigate(['/']);
      },
      error => {
        console.error(`Error: ${error.toString()}`);
      }
    );
  }
}
