import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { SessionService } from '../../providers/session-service/session-service';
import { Sender } from "../../providers/sender/sender";
import { forkJoin } from 'rxjs/observable/forkJoin';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  favs = []
  obs = []
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private request: Sender,
    private nativeStorage: NativeStorage,
    private session: SessionService,
    public loadingCtrl: LoadingController,
  ) {  }

 ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Loading favs'
    })
    loading.present()
    this.nativeStorage.getItem(this.session.getUser()).then(user => {
      for (var i in user.fav) {
        this.obs.push(this.request.coinDetails(user.fav[i]))
      }
      forkJoin(this.obs).subscribe(response => {
        let coins = []
        for (var i in response) {
          coins = response
          this.favs.push(coins[i].data)
          
        }
        console.log(JSON.stringify(this.favs))
        loading.dismiss()
      })
    })
  }

  test() {
    console.log(JSON.stringify(this.favs[0]))
  }

}
