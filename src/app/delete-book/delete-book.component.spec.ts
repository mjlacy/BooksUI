import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteBookComponent } from './delete-book.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../service/book.service';
import { of } from 'rxjs';
import { Book } from '../model/model';
import { By } from '@angular/platform-browser';

describe('DeleteBookComponent', () => {
  let component: DeleteBookComponent;
  let fixture: ComponentFixture<DeleteBookComponent>;
  const testBook = new Book('5a80868574fdd6de0f4fa438', 1, 'War and Peace', 'Leo Tolstoy', 1869);
  let router: Router;
  let mockBookService;

  beforeEach(async(() => {
    mockBookService = jasmine.createSpyObj(['getBook']);

    TestBed.configureTestingModule({
      declarations: [ DeleteBookComponent ],
      imports: [RouterModule.forRoot([]), FormsModule, HttpClientTestingModule],
      providers : [
        { provide: BookService, useValue: mockBookService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookComponent);
    component = fixture.componentInstance;
    mockBookService.getBook.and.returnValue(of(testBook));
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book title', () => {
    expect(fixture.nativeElement.querySelector('h2').innerText).toContain(testBook.title);
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
});
