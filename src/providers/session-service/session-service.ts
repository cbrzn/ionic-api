import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SessionManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionService {
  username:string
  constructor(public http: HttpClient) {
    this.username
  }
  
  setUser(username:string) {
    this.username = username
  }

  getUser() {
    return this.username
  }

}
