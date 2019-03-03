import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { GrowlService } from '../services/growl.service';
import { Growl, GrowlStatus } from '../models/growl.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
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

  onSubmit(): void {
    this.bookService.putBook(this.book)
      .subscribe(() => {
          this.growlService.add(new Growl(GrowlStatus.Success, 'Success', 'Book changed successfully'));
          this.router.navigate(['/']);
        },
        error => {
          this.growlService.add(new Growl(GrowlStatus.Error, 'Error', error.error));
          console.error(`Error: ${error}`);
        }
      );
  }
}
