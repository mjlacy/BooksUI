import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBookComponent } from './edit-book.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BookService } from '../service/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Book } from '../model/model';

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  const testBook = new Book('5a80868574fdd6de0f4fa438', 1, 'War and Peace', 'Leo Tolstoy', 1869);
  let mockBookService;

  beforeEach(async(() => {
    mockBookService = jasmine.createSpyObj(['getBook']);

    TestBed.configureTestingModule({
      declarations: [ EditBookComponent ],
      imports: [RouterModule.forRoot([]), FormsModule, HttpClientTestingModule],
      providers : [
        { provide: BookService, useValue: mockBookService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    mockBookService.getBook.and.returnValue(of(testBook));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should preload book properties', () => {
    expect(component.book._id).toBe(testBook._id);
    expect(component.book.bookId).toBe(testBook.bookId);
    expect(component.book.title).toBe(testBook.title);
    expect(component.book.author).toBe(testBook.author);
    expect(component.book.year).toBe(testBook.year);
  });

  it('should disable submit button if book id number is set blank', (done: DoneFn) => {
    component.book.bookId = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button if title is set blank', (done: DoneFn) => {
    component.book.title = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button if author is set blank', (done: DoneFn) => {
    component.book.author = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should disable submit button if year is set blank', (done: DoneFn) => {
    component.book.year = undefined;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
      done();
    });
  });

  it('should call onSubmit() when submit button is clicked', () => {
    spyOn(component, 'onSubmit');

    fixture.nativeElement.querySelector('button').click();
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
