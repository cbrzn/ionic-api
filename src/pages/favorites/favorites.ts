import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from "@ionic-native/native-storage";
import { SessionService } from '../../providers/session-service/session-service';
import { Sender } from "../../providers/sender/sender";
import { forkJoin } from 'rxjs/observable/forkJoin';
import { HomePage } from '../home/home';

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
  has_fav:any
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private request: Sender,
    private nativeStorage: NativeStorage,
    private session: SessionService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) {  }

 ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Loading favs'
    })
    loading.present()
    this.nativeStorage.getItem(this.session.getUser()).then(user => {
      if (user.fav == null) {
        this.has_fav = null
        this.favs.push({name:"Add new favorite coins"})
      } else {
        this.has_fav = ''
        for (var i in user.fav) {
          this.obs.push(this.request.coinDetails(user.fav[i]))
        }
        forkJoin(this.obs).subscribe(response => {
          let coins = []
          for (var i in response) {
            coins = response
            this.favs.push(coins[i].data) 
          }
        })
      }
      loading.dismiss()
    })
  }

  deleteFavs(fav) {
    const name = fav.name
    const confirm = this.alertCtrl.create({
      title: 'You sure?',
      message: `Do you want to delete ${name} from your favorites?`,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.nativeStorage.getItem(this.session.getUser()).then(user => {
              let favorites = user.fav
              const password = user.password
              var index = favorites.indexOf(fav.id)
              if (index > -1) {
                favorites.splice(index, 1)
              }
              this.nativeStorage.remove('fav').then(data => {
                this.nativeStorage.setItem(this.session.getUser(), {
                  password,
                  fav: favorites
                }).then(data => {
                  let alert = this.alertCtrl.create({
                    title: 'Fav deleted',
                    subTitle: `You have deleted ${name} from your favorites!` ,
                    buttons: ['Dismiss']
                  });
                  alert.present();
                  alert.onDidDismiss(() => {
                    this.navCtrl.setRoot(HomePage)
                  })
                })
              })
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
