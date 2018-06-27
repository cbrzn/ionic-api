import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Content } from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";
import { CoinDetailsPage } from '../coin-details/coin-details'
import { AlertController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service/session-service';
import { AccountPage } from '../account/account';
import { FavoritesPage } from '../favorites/favorites';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content;

  username:string;
  all:boolean = true
  constructor(
  	public navCtrl: NavController,
  	private request: Sender,
    private alertCtrl: AlertController,
    private session: SessionService,
    public loadingCtrl: LoadingController
  ) {
    this.username = this.session.getUser()
  }  
  allItems = []
  currentItems = []
  index: number = 20
  all_index:number = 0
  search:string
  search_status:boolean = false
  ionViewDidLoad() {
      
      for (let i = 0; i < response.data.length; i++) {
        let { name, symbol, id } = response.data[i]
        this.allItems.push({ name, symbol, id })
      let alert = this.alertCtrl.create({
        title: 'Conection error',
        subTitle: 'Please check your internet conection',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  scrollDown(event) {
    for (let i = this.index; i < this.index+20; i++){
      this.currentItems.push(this.allItems[i])
    }

    this.index += 20
    event.complete()
    console.log(this.currentItems.length)
  }
}
