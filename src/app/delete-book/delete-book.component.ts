import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BookService} from '../service/book.service';
import {Router} from '@angular/router';
import {Book} from '../model/model';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  // _id: any;
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

  deleteBook(){
    this.bookService.deleteBook(this.book._id)
      .subscribe(data => {
          this.goHome();
        },
        err => {
          console.log(err)
        }
      )
  }

  goHome(){
    this.router.navigate(["/"]);
  }

}
