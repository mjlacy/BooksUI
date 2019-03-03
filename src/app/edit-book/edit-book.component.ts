import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../model/model';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
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

  onSubmit(): void {
    this.bookService.putBook(this.book)
      .subscribe(() => {
          this.router.navigate(['/']);
        },
        error => {
          console.error(`Error: ${error}`);
        }
      );
  }
}
