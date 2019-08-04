import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBookComponent } from './add-book.component';
import { BooksService } from '../service/books.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from '../models/book.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let mockBookService;
  let router: Router;

  beforeEach(async(() => {
    mockBookService = jasmine.createSpyObj(['postBook']);

    TestBed.configureTestingModule({
      declarations: [ AddBookComponent ],
      imports: [RouterModule.forRoot([]), FormsModule, HttpClientTestingModule],
      providers : [
        { provide: BooksService, useValue: mockBookService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    mockBookService.postBook.and.returnValue(of(new Book()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button when first loaded', (done: DoneFn) => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button while book id number is empty', (done: DoneFn) => {
    component.book.title = 'test';
    component.book.author = 'tester';
    component.book.year = 0;

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button while title is empty', (done: DoneFn) => {
    component.book.bookId = 0;
    component.book.author = 'tester';
    component.book.year = 0;

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button while author is empty', (done: DoneFn) => {
    component.book.bookId = 0;
    component.book.title = 'test';
    component.book.year = 0;

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button while year is empty', (done: DoneFn) => {
    component.book.bookId = 0;
    component.book.title = 'test';
    component.book.author = 'tester';

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should enable submit button when all fields are given', (done: DoneFn) => {
    component.book.bookId = 0;
    component.book.title = 'test';
    component.book.author = 'tester';
    component.book.year = 0;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(false);
      done();
    });
  });

  it('should call onSubmit() when submit button is clicked', (done: DoneFn) => {
    spyOn(component, 'onSubmit');

    component.book.bookId = 0;
    component.book.title = 'test';
    component.book.author = 'tester';
    component.book.year = 0;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      expect(component.onSubmit).toHaveBeenCalled();
      done();
    });
  });

  it('should return to the home page after submitting a book', (done: DoneFn) => {
    spyOn(router, 'navigate');

    component.book.bookId = 0;
    component.book.title = 'test';
    component.book.author = 'tester';
    component.book.year = 0;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should write error to console if book writing fails', (done: DoneFn) => {
    spyOn(console, 'log');
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    mockBookService.postBook.and.returnValue(throwError(returnedError));

    component.book.bookId = 0;
    component.book.title = 'test';
    component.book.author = 'tester';
    component.book.year = 0;

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      expect(console.log).toHaveBeenCalledWith(returnedError);
      done();
    });
  });
});
