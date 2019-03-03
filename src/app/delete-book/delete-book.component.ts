import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { Growl, GrowlStatus } from '../models/growl.model';
import { GrowlService } from '../services/growl.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  book = new Book();

  constructor(private route: ActivatedRoute,
              private bookService: BookService,
              private router: Router,
              private growlService: GrowlService) {}

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
          this.growlService.add(new Growl(GrowlStatus.Success, 'Success', 'Book deleted successfully'));
          this.goHome();
        },
        err => {
          this.growlService.add(new Growl(GrowlStatus.Error, 'Error', err.error));
          console.log(err);
        }
      );
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
