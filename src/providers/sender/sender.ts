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
  
  constructor(public http: HttpClient) { }

  getAllCoins(): Observable<any> {
    return this.http.get<any>('https://api.coinmarketcap.com/v2/listings/')
  }


  getCoinsByRank(index): Observable<any> {
    return this.http.get<any>(`https://api.coinmarketcap.com/v2/ticker/?start=${index}`)
  }

  coinDetails(id): Observable<any> {
    return this.http.get<any>(`https://api.coinmarketcap.com/v2/ticker/${id}/`)
  }

  coinDetailsConverted(id, sym): Observable<any> {
    return this.http.get<any>(`https://api.coinmarketcap.com/v2/ticker/${id}/?convert=${sym}`)
  }

}