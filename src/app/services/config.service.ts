import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public config: any = undefined;

  constructor(private http: HttpClient) {
  }

  load(): Promise<boolean> {
    return new Promise<boolean>(
      (resolve: (successful: boolean) => void, reject: () => void): void => {
        this.http.get('../assets/config/config.json').subscribe(data => {
          this.config = data;
          resolve(true);
        }, err => {
          console.error(err);
          reject();
        });
      }
    );
  }
}
