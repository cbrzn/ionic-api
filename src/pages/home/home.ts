import { Component} from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";
import { NativeStorage } from "@ionic-native/native-storage";
import { CoinDetailsPage } from '../coin-details/coin-details'
import { AlertController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service/session-service';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
  
  username: string;
  constructor(
  	public navCtrl: NavController,
  	private request: Sender,
    private nativeStorage: NativeStorage,
    private alertCtrl: AlertController,
    private session: SessionService,
    public loadingCtrl: LoadingController
  ) {
    this.username = this.session.getUser()
  }  
  allItems = []
  currentItems = []
  index: number = 20
  view: string = 'all'
  all_index:number = 0
  
  ionViewDidLoad() {
    this.allCoins()
  }


  allCoins() {
    let loading = this.loadingCtrl.create({
      content: 'Loading coins'
    })
    loading.present()
    this.request.getAllCoins().subscribe(response => {
      loading.dismiss()
      for (var i=0; i<response.data.length; i++) {
        var { name, symbol, id } = response.data[i]
        this.allItems.push({ name, symbol, id })
      }
      this.currentItems = this.allItems.splice(0, this.index)
    },
     err => {
      let alert = this.alertCtrl.create({
        title: 'Conection error',
        subTitle: 'Please check your internet conection',
        buttons: ['Dismiss']
      });
      alert.present();
      alert.onDidDismiss(() => {
        this.navCtrl.push(HomePage)
      })
    })
  }

  byRank(index) {
    let loading = this.loadingCtrl.create({
      content: 'Loading coins'
    })
    loading.present()
    this.view = 'rank'
    this.allItems = []
    this.currentItems = []
    this.index = 20
    this.request.getCoinsByRank(1).subscribe(response => {
      loading.dismiss()
      for (var identifier in response.data) {
        var { name, symbol, id, rank } = response.data[identifier]
        this.allItems.push({ name, symbol, id, rank })
      }
      // console.log(JSON.stringify(this.allItems))
      this.currentItems = this.allItems.splice(0, this.index)
      this.all_index += 101
    },
    err => {
      let alert = this.alertCtrl.create({
        title: 'Conection error',
        subTitle: 'Please check your internet conection',
        buttons: ['Dismiss']
      });
      alert.present();
    })
  }

  scrollDown(event) {
    if (this.view == 'all') {
      for (var i=this.index; i<this.index+20; i++){
        this.currentItems.push(this.allItems[i])
      }
      this.index += 20
      event.complete()
    } else {
      if (this.currentItems.length == this.allItems.length) {
        this.request.getCoinsByRank(this.all_index).subscribe(response => {
          for (var identifier in response.data) {
            var { name, symbol, id, rank } = response.data[identifier]
            this.allItems.push({ name, symbol, id, rank })
          }
          this.currentItems = this.allItems.splice(this.index, this.index+20)
          event.complete()
        },
        err => {
          console.log(err.message)
        })
      } else {
        for (var f=this.index; f<this.index+20; f++){
          this.currentItems.push(this.allItems[f])
        }
        this.index += 20
        event.complete()
      }
    }
  }

  certainCoin(id) {
    this.request.coinDetails(id).subscribe(response => {
      console.log(JSON.stringify(response))
    })
    this.navCtrl.push(CoinDetailsPage);
  }

    set() {
        this.nativeStorage
            .setItem("myitem", {
                test: 'test'
            })
            .then(() => {
                    console.log("Stored item!");
                },
                error => console.error("Error storing item", error));
    }

    get() {
        this.nativeStorage
            .getItem("myitem")
            .then(data => {
                console.log(data);
                alert(JSON.stringify(data))
            }, error => console.error(error));
    }
}