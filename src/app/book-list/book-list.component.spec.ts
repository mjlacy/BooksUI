import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { BookListComponent } from './book-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BooksService } from '../services/books-service/books.service';
import { of, throwError } from 'rxjs';
import { Book } from '../models/book.model';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { AddBookComponent } from '../add-book/add-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { FormsModule } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { HttpErrorResponse } from '@angular/common/http';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let mockBookService;

  const routes: Routes = [
    { path: '', component: BookListComponent},
    { path: 'addBook', component: AddBookComponent},
    { path: 'editBook/:_id', component: EditBookComponent},
    { path: 'deleteBook/:_id', component: DeleteBookComponent},
    { path: '**', component: BookListComponent }
  ];

  beforeEach(waitForAsync(() => {
    mockBookService = jasmine.createSpyObj(['getBooks']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [ BookListComponent, AddBookComponent, EditBookComponent, DeleteBookComponent ],
      providers : [
        { provide: BooksService, useValue: mockBookService}
      ]
    }).compileComponents();
  }));

  const mockBooks = {
    books : [
      plainToClass(Book, {_id: '5a80868574fdd6de0f4fa438', bookId: 1, title: 'War and Peace', author: 'Leo Tolstoy', year: 1869}),
      plainToClass(Book, {_id: '5b4b793e90f24cb123c57ff5', bookId: 2, title: 'Lord of the Flies', author: 'William Golding', year: 1954})
    ]
  };

  beforeEach(() => {
    httpTestingController = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    mockBookService.getBooks.and.returnValue(of(mockBooks));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call book service when loaded and populate books array on load', () => {
    spyOn(component, 'getBooks').and.callThrough();

    fixture.detectChanges();

    expect(component.getBooks).toHaveBeenCalled();
    expect(fixture.debugElement.queryAll(By.css('.btn-success')).length).toBe(2);
    expect(component.books.length).toEqual(2);
  });

  it('should write error to console if book loading fails', () => {
    spyOn(console, 'log');
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    mockBookService.getBooks.and.returnValue(throwError(returnedError));

    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(returnedError);
  });

  it('should navigate to the add book page when the "Add Book" button is clicked',
    waitForAsync(inject([Location], (location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.query(By.css('.btn-primary')).nativeElement.click();

      fixture.whenStable().then(() => {
        expect(location.path()).toEqual('/addBook');
      });
    }))
  );

  it('should navigate to the edit page when the edit button of a book is clicked',
    waitForAsync(inject([Location], (location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.queryAll(By.css('.btn-success'))[0].nativeElement.click();

      fixture.whenStable().then(() => {
        expect(location.path()).toEqual(`/editBook/${mockBooks.books[0]._id}`);
      });
    }))
  );

  it('should navigate to the delete page when the delete button of a book is clicked',
    waitForAsync(inject([Location], (location: Location) => {
      fixture.detectChanges();

      fixture.debugElement.queryAll(By.css('.btn-danger'))[0].nativeElement.click();

      fixture.whenStable().then(() => {
        expect(location.path()).toEqual(`/deleteBook/${mockBooks.books[0]._id}`);
      });
    }))
  );
});
