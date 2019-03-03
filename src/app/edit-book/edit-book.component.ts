import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Book} from '../model/model';
import {BookService} from '../service/book.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  //bookId: any;
  book = new Book();
  sub: any;
  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.sub =  this.route.params.subscribe(params => {
      this.bookService.getBook(params['_id'])
        .subscribe(book => this.book = book,
          error => {
            console.error("Error: " + error);
        })
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.bookService.putBook(this.book)
      .subscribe(data => {
          this.router.navigate(["/"]);
        },
        error => {
          console.error("Error: " + error);
        }
      )
  }
}
