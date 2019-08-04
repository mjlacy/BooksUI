import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBookComponent } from './edit-book.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BooksService } from '../service/books.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Book } from '../models/book.model';
import { plainToClass } from 'class-transformer';
import { HttpErrorResponse } from '@angular/common/http';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  const testBook: Book =
    plainToClass(Book, {_id: '5a80868574fdd6de0f4fa438', bookId: 1, title: 'War and Peace', author: 'Leo Tolstoy', year: 1869});
  let mockBookService;
  let router: Router;

  beforeEach(async(() => {
    mockBookService = jasmine.createSpyObj(['getBook', 'putBook']);

    TestBed.configureTestingModule({
      declarations: [ EditBookComponent ],
      imports: [RouterModule.forRoot([]), FormsModule, HttpClientTestingModule],
      providers : [
        { provide: BooksService, useValue: mockBookService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    mockBookService.getBook.and.returnValue(of(JSON.parse(JSON.stringify(testBook))));
    mockBookService.putBook.and.returnValue(of(testBook));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preload book properties', () => {
    fixture.detectChanges();
    expect(component.book._id).toBe(testBook._id);
    expect(component.book.bookId).toBe(testBook.bookId);
    expect(component.book.title).toBe(testBook.title);
    expect(component.book.author).toBe(testBook.author);
    expect(component.book.year).toBe(testBook.year);
  });

  it('should write error to console if book loading fails', () => {
    spyOn(console, 'log');
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    mockBookService.getBook.and.returnValue(throwError(returnedError));

    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(returnedError);
  });

  it('should disable submit button if book id number is set blank', (done: DoneFn) => {
    fixture.detectChanges();
    component.book.bookId = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button if title is set blank', (done: DoneFn) => {
    fixture.detectChanges();
    component.book.title = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button if author is set blank', (done: DoneFn) => {
    fixture.detectChanges();
    component.book.author = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button if year is set blank', (done: DoneFn) => {
    fixture.detectChanges();
    component.book.year = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should call onSubmit() when submit button is clicked', () => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');

    fixture.nativeElement.querySelector('button').click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should return to the home page after resubmitting a book', (done: DoneFn) => {
    fixture.detectChanges();
    spyOn(router, 'navigate');

    fixture.nativeElement.querySelector('button').click();

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
    mockBookService.putBook.and.returnValue(throwError(returnedError));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      expect(console.log).toHaveBeenCalledWith(returnedError);
      done();
    });
  });
});
