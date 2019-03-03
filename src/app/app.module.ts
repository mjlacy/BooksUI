import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { AppRoutingModule } from './app-routing.module';
import { BookService } from './services/book.service';
import { ConfigService } from './services/config.service';
import { appInitializerFactory } from './app-initalizer-factory';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {GrowlModule} from 'primeng/growl';
import {GrowlService} from './services/growl.service';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    AddBookComponent,
    EditBookComponent,
    DeleteBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    ButtonModule,
    GrowlModule
  ],
  providers: [
    BookService,
    ConfigService,
    GrowlService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [
        ConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
