import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Sender provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Sender {
  
  constructor(public http: HttpClient) {
    console.log('Hello Sender Provider');
  }

  getCoins(): Observable<any> {
    return this.http.get<any>('https://api.coinmarketcap.com/v2/listings/')
  }

  coinDetails(id): Observable<any> {
    return this.http.get<any>(`https://api.coinmarketcap.com/v2/ticker/${id}/`)
  }

}