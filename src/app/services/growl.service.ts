import { EventEmitter, Injectable } from '@angular/core';
import { Growl } from '../models/growl.model';

@Injectable()
export class GrowlService {
  growlAdded: EventEmitter<Growl> = new EventEmitter<Growl>();

  public add(growl: Growl): void {
    this.growlAdded.emit(growl);
  }
}
