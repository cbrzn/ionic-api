import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";

/**
 * Generated class for the CalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  crypto_coins:Array<string> = ["BTC", "ETH", "XRP", "LTC", "BCH"] 
  all_coins:Array<string> = ["USD", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR", "BTC", "ETH", "XRP", "LTC", "BCH"]
  crypto_value:number
  fiat_value:number
  id:Number
  crypto:string = this.crypto_coins[0]
  fiat:string = this.all_coins[0]
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sender: Sender) {
  }

  ionViewDidLoad() {
    this.sender.coinDetailsConverted(1, "USD").subscribe(response => {
      this.crypto_value = 1
      this.fiat_value = response.data.quotes.USD.price
    })
  }


  checkId() {
    switch(this.crypto) {
      case 'BTC':
       this.id = 1
      break
      case 'ETH':
       this.id = 1027
      break
      case 'XRP':
       this.id = 52
      break
      case 'LTC':
        this.id = 2
      break
      case 'BCH':
        this.id = 1831
      break
    }
  }

  calculateByCrypto() {
    this.checkId()
    this.sender.coinDetailsConverted(this.id, this.fiat).subscribe(response => {
      this.fiat_value = this.crypto_value * response.data.quotes[this.fiat].price
    }, error => {
      console.log(JSON.stringify(error))
    })
  }


  calculateByFiat() {
    this.checkId()
    this.sender.coinDetailsConverted(this.id, this.fiat).subscribe(response => {
        this.crypto_value = this.fiat_value / response.data.quotes[this.fiat].price
      }, error => {
        console.log(JSON.stringify(error))
      })
   }

  newFiat() {
    this.checkId()
    this.sender.coinDetailsConverted(this.id, this.fiat).subscribe(response => {
      this.crypto_value = 1
      this.fiat_value = response.data.quotes[this.fiat].price
    }, error => {
      console.log(error)
    })  
  }

  newCrypto() {
    this.checkId()
    this.sender.coinDetailsConverted(this.id, this.fiat).subscribe(response => {
      this.crypto_value = 1
      this.fiat_value = response.data.quotes[this.fiat].price
    }, error => {
      console.log(error)
    })
  }
}
