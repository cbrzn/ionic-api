import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";
import { SessionService } from '../../providers/session-service/session-service';
import { AlertController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";

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
  coinmarket:any = this.params.get('coinmarket')
  coinprice:any = this.params.get('coinprice')
  coins:Array<string> = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR", "BTC", "ETH", "XRP", "LTC", "BCH"];
  currency:string
  new_coin:any
  new_coin_sym:string
  new_coin_market:string
  username:string
  fav:Array<Number> = []
  repeated:boolean = false
  constructor(
    public navCtrl: NavController, 
    private request: Sender,
    private session: SessionService,
    public params: NavParams,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    public viewCtrl: ViewController,
  ) {    
    this.username = this.session.getUser()
  }

  convert() {
    if (this.currency == null) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'You need to select a currency',
        buttons: ['Dismiss']
      });
      alert.present()
    } else {
      let loading = this.loadingCtrl.create({
        content: 'Loading stats'
      })
      loading.present()
      this.request.coinDetailsConverted(this.coin.id, this.currency).subscribe(response => {
        loading.dismiss()
        this.new_coin_market = response.data.quotes[this.currency].market_cap.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        this.new_coin = response.data.quotes[this.currency]
        this.new_coin_sym = this.currency
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Conection error',
          subTitle: 'Please check your internet conection',
          buttons: ['Dismiss']
        });
        alert.present()
      })
    }
  }
    
  newFav() {
    this.nativeStorage.getItem(this.username).then(data => {
      if (data.fav == null) {
        this.fav = [this.coin.id]
      } else {
        for (var i in data.fav) {
          if (data.fav[i] == this.coin.id) {
            this.repeated = true
          } 
        }
        if (this.repeated) {
          this.fav = data.fav
        } else {
          this.fav = data.fav  
          this.fav.push(this.coin.id)
        }
      }
      this.nativeStorage.setItem(this.username, {
        password: data.password,
        fav: this.fav
      }).then(() => {
        if (!this.repeated) {
          let alert = this.alertCtrl.create({
            title: 'Fav successful',
            subTitle: `You have added ${this.coin.name} to your favorite coins`,
            buttons: ['Dismiss']
          })
          alert.present();
        } else {
          let alert = this.alertCtrl.create({
            title: 'Fav failed',
            subTitle: `${this.coin.name} it's already in your favorites!`,
            buttons: ['Dismiss']
          })
          alert.present();
        }
      },
      error => {
        console.log(error)
      })
    })
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

}
