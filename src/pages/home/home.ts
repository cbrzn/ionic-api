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
    this.allCoins()
  } 
  
  searchByName() {
    this.search_status = true
    this.currentItems = []
    for (var i in this.allItems) {
      this.allItems[i].name.toLowerCase().includes(this.search) ? this.currentItems.push(this.allItems[i]) : this.currentItems
    }
    this.search = ""
  }

  compare = (a,b) => {
    a = a.rank
    b = b.rank
    let comparison = 0
    if (a > b) {
    comparison = 1
    } else if (a < b) {
        comparison = -1
    }
    return comparison
  } 

  compareValue(ev: any){
      // set val to the value of the searchbar
      this.currentItems = []

      const val = ev.target.value;
      
      if (val == "") {
        this.currentItems.push(this.allItems)
      } else {
        for (var i in this.allItems) {
          this.allItems[i].name.toLowerCase().includes(val) ? this.currentItems.push(this.allItems[i]) : this.currentItems
        }
      }
  }


  allCoins() {
    this.search_status = false
    let loading = this.loadingCtrl.create({
      content: 'Loading coins'
    })
    loading.present()
    this.allItems = []
    this.currentItems = []
    this.index = 20
    this.request.getAllCoins().subscribe(response => {
      loading.dismiss()
      this.all = true
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
        this.navCtrl.setRoot(HomePage)
      })
    })
  }

  byRank() {
    this.search_status = false
    let loading = this.loadingCtrl.create({
      content: 'Loading coins'
    })
    loading.present()
    this.all = false
    this.allItems = []
    this.currentItems = []
    this.index = 20
    this.request.getCoinsByRank(1).subscribe(response => {
      loading.dismiss()
      for (var identifier in response.data) {
        var { name, symbol, id, rank } = response.data[identifier]
        this.allItems.push({ name, symbol, id, rank })
      }
      this.allItems.sort(this.compare)  
      for (var i=0; i<this.index; i++){
        this.currentItems.push(this.allItems[i])
      }
      this.all_index += 100
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
    if (this.search_status) {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'No more coins founded by your search',
        buttons: ['Dismiss']
      });
      alert.present();
      alert.onDidDismiss(() => {
        event.complete()
        this.content.scrollToTop()
      })
    } else {
      if (this.all == true) {
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
          this.allItems.sort(this.compare)
          for (var i=this.index; i<this.index+20; i++){
            this.currentItems.push(this.allItems[i])
          }
          this.index += 20
          this.all_index += 100
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
}
  certainCoin(id) {
    let loading = this.loadingCtrl.create({
      content: 'Loading coin details'
    })
    loading.present()
    this.request.coinDetails(id).subscribe(response => {
      loading.dismiss()
      const coin = response.data
      console.log(coin);
      const coinprice = coin.quotes.USD.price;
      

      const coinmarket = coin.quotes.USD.market_cap.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      console.log(coinmarket);
      this.navCtrl.push(CoinDetailsPage, {
        coin, coinmarket, coinprice
      });
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Conection error',
        subTitle: 'Please check your internet conection',
        buttons: ['Dismiss']
      });
      alert.present();
      alert.onDidDismiss(() => {
        this.navCtrl.setRoot(HomePage)
      })
    })
  }

  accountView() {
    this.navCtrl.push(AccountPage)
  }

  favView() {
    this.navCtrl.push(FavoritesPage)
  }
  
}