import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CoinDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-coin-details',
  templateUrl: 'coin-details.html',
})
export class CoinDetailsPage {

  coin:any = this.params.get('coin')

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
  ) {  }

  ionViewDidLoad() {
    console.log(JSON.stringify(this.coin))
  }

}
