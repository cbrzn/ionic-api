import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Content, ModalController } from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";
import { CoinDetailsPage } from '../coin-details/coin-details'
import { AlertController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service/session-service';
import { AccountPage } from '../account/account';
import { FavoritesPage } from '../favorites/favorites';
import { CalculatorPage } from '../calculator/calculator';


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
  	public request: Sender,
    public alertCtrl: AlertController,
    public session: SessionService,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
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
      this.search_status = true
      
      const val = ev.target.value;
      console.log(val);
      if (val == null) {
        this.allCoins()
        this.search_status = false
      } else {
        for (var i in this.allItems) {
          this.allItems[i].name.toLowerCase().includes(val.toLowerCase()) ? this.currentItems.push(this.allItems[i]) : this.currentItems
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
      for (var k=0; k<20; k++) {
        this.currentItems.push(this.allItems[k])
      }
    },
     err => {
      loading.dismiss()
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
      loading.dismiss()
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
      

      const coinmarket = coin.quotes.USD.market_cap.toString().replace(/(\d)(?=(\d\d  \d)+(?!\d))/g, "$1.");
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

  coinModal(id) {
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
      let modal = this.modalCtrl.create(CoinDetailsPage, {
        coin, coinmarket, coinprice
      });
      modal.present();
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

  calcView() {
    this.navCtrl.push(CalculatorPage)
  }
  
}

