import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";
import { SessionService } from '../../providers/session-service/session-service';

/**
 * Generated class for the CoinDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'coin-details',
  templateUrl: 'coin-details.html',
})
export class CoinDetailsPage {

  coin:any = this.params.get('coin')
  coins:Array<string> = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR", "BTC", "ETH", "XRP", "LTC", "BCH"];
  currency:string
  new_coin:any
  new_coin_sym:string
  username:string
  constructor(
    public navCtrl: NavController, 
    private request: Sender,
    private session: SessionService,
    public params: NavParams,
  ) {    
    this.username = this.session.getUser()
  }

  ionViewDidLoad() {
    console.log(JSON.stringify(this.coin.quotes['USD']))
    console.log(JSON.stringify(this.coin))
  }

  convert() {
    this.request.coinDetailsConverted(this.coin.id, this.currency).subscribe(response => {
      this.new_coin = response.data.quotes[this.currency]
      this.new_coin_sym = this.currency
    }, err => {
      console.log(err)
    })
  }

  newFav() {
    
  }

}
