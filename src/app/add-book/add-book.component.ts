import { Component } from '@angular/core';
import { Book } from '../models/book.model';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import {GrowlService} from '../services/growl.service';
import {Growl, GrowlStatus} from '../models/growl.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  book = new Book();

  constructor(private bookService: BookService,
              private router: Router,
              private growlService: GrowlService) { }

  onSubmit(): void {
    this.bookService.postBook(this.book)
      .subscribe(() => {
        this.growlService.add(new Growl(GrowlStatus.Success, 'Success', 'Book created successfully'));
        this.router.navigate(['/']);
      },
      error => {
        this.growlService.add(new Growl(GrowlStatus.Error, 'Error', error.error));
        console.error(`Error: ${error.toString()}`);
      }
    );
  }
}
