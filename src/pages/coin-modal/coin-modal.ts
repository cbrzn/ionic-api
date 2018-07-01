import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";

/**
 * Generated class for the CoinModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin-modal',
  templateUrl: 'coin-modal.html',
})
export class CoinModalPage {
  coin: any = this.params.get('coin')
  coinmarket: any = this.params.get('coinmarket')
  coinprice: any = this.params.get('coinprice')
  coins: Array<string> = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR", "BTC", "ETH", "XRP", "LTC", "BCH"];
  currency: string
  new_coin: any
  new_coin_sym: string
  new_coin_market: string
  username: string
  fav: Array<Number> = []
  repeated: boolean = false
  constructor(public navCtrl: NavController, public navParams: NavParams, private request: Sender) {
    getAllCoins() {
      let modal = this.modalCtrl.create(ModalContentPage, characterNum);
      modal.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoinModalPage');
  }

}


import { ModalController, Platform, ViewController } from 'ionic-angular';

export class ModalContentPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
      {
        name: 'Frodo',
        quote: 'Go back, Sam! I\'m going to Mordor alone!',
        image: 'assets/img/avatar-frodo.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Weapon', note: 'Sting' }
        ]
      },
      {
        name: 'Samwise Gamgee',
        quote: 'What we need is a few good taters.',
        image: 'assets/img/avatar-samwise.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'Shire Folk' },
          { title: 'Nickname', note: 'Sam' }
        ]
      }
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
