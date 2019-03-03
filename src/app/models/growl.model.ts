import {Message} from 'primeng/api';

export class Growl {
  public message: Message;
  public life = 5000;
  public sticky = false;

  public constructor(severity: GrowlStatus, summary: string, detail: string, life: number = 5000, sticky: boolean = false) {
    this.message = {
      severity : severity.toString(),
      summary,
      detail
    };
    this.life = life;
    this.sticky = sticky;
  }
}

export enum GrowlStatus {
  Success = 'success',
  Info = 'info',
  Warn = 'warn',
  Error = 'error'
}
