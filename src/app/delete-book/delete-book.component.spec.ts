import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeleteBookComponent } from './delete-book.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BooksService } from '../services/books-service/books.service';
import { of, throwError } from 'rxjs';
import { Book } from '../models/book.model';
import { By } from '@angular/platform-browser';
import { plainToClass } from 'class-transformer';
import { HttpErrorResponse } from '@angular/common/http';

describe('DeleteBookComponent', () => {
  let component: DeleteBookComponent;
  let fixture: ComponentFixture<DeleteBookComponent>;
  const testBook: Book =
    plainToClass(Book, {_id: '5a80868574fdd6de0f4fa438', bookId: 1, title: 'War and Peace', author: 'Leo Tolstoy', year: 1869});
  let router: Router;
  let mockBookService;

  beforeEach(waitForAsync(() => {
    mockBookService = jasmine.createSpyObj(['getBook', 'deleteBook']);

    TestBed.configureTestingModule({
      declarations: [ DeleteBookComponent ],
      imports: [RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }), FormsModule, HttpClientTestingModule],
      providers : [
        { provide: BooksService, useValue: mockBookService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookComponent);
    component = fixture.componentInstance;
    mockBookService.getBook.and.returnValue(of(testBook));
    mockBookService.deleteBook.and.returnValue(of(null));
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book title', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').innerText).toContain(testBook.title);
  });

  it('should write error to console if book loading fails', () => {
    spyOn(console, 'log');
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    mockBookService.getBook.and.returnValue(throwError(returnedError));

    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(returnedError);
  });

  it('should call deleteBook() when the yes button is clicked', () => {
    spyOn(component, 'deleteBook');

    fixture.debugElement.query(By.css('.btn-danger')).nativeElement.click();
    expect(component.deleteBook).toHaveBeenCalled();
  });

  it('should call goHome() when the no button is clicked', () => {
    spyOn(component, 'goHome').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');

    fixture.debugElement.query(By.css('.btn-warning')).nativeElement.click();
    expect(component.goHome).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should call goHome() after deleting a book', () => {
    spyOn(component, 'goHome').and.callThrough();
    const navigateSpy = spyOn(router, 'navigate');

    fixture.nativeElement.querySelector('.btn-danger').click();
    expect(component.goHome).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should write error to console if book deletion fails', (done: DoneFn) => {
    spyOn(console, 'log');
    const returnedError = new HttpErrorResponse({status: 500, statusText: 'Internal Server Error'});
    mockBookService.deleteBook.and.returnValue(throwError(returnedError));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('button').click();
      expect(console.log).toHaveBeenCalledWith(returnedError);
      done();
    });
  });
});
