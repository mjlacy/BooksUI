import { Component } from '@angular/core';
import { Growl } from './models/growl.model';
import { GrowlService } from './services/growl.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  messages: Array<Message> = [];

  constructor(private growlService: GrowlService) {
    this.growlService.growlAdded.subscribe(
      (growl: Growl): void => {
        this.messages.push(growl.message);
      },
      (error: Error): void => {
        console.error(error.message || error);
      }
    );
  }
}
