import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { SessionService } from '../../providers/session-service/session-service';
import { Sender } from "../../providers/sender/sender";
import { Observable } from 'rxjs/Observable';

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
    this.nativeStorage.getItem(this.session.getUser()).then(async data => {
      Observable.forkJoin([

      ])
      for (var i in data.fav) {
       this.request.coinDetails(data.fav[i]).subscribe(response => {
           this.favs.push(response.data)
           console.log('a')
        })
      }
      loading.dismiss()
      await console.log('done')
      await console.log(JSON.stringify(this.favs))
    })
  }

  test() {
    console.log(JSON.stringify(this.favs[0]))
  }

}
