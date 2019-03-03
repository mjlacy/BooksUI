import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../model/model';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  book = new Book();

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('_id');

    this.bookService.getBook(id)
      .subscribe(book => this.book = book,
        error => {
          console.error(`Error: ${error}`);
        });
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.book._id)
      .subscribe(() => {
          this.goHome();
        },
        err => {
          console.log(err);
        }
      );
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
