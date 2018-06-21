import { Component} from '@angular/core';
import { NavController} from 'ionic-angular';
import { Sender } from "../../providers/sender/sender";
import { NativeStorage } from "@ionic-native/native-storage";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

  constructor(
  	public navCtrl: NavController,
  	private request: Sender,
  	private nativeStorage: NativeStorage) {
  }
  
  allItems = []
  currentItems = []
  index: number = 20
  
  ionViewDidLoad() {
    this.request.getCoins().subscribe(response => {
      for (let i = 0; i < response.data.length; i++) {
        var { name, symbol, id } = response.data[i]
        this.allItems.push({ name, symbol, id })
      }
      this.currentItems = this.allItems.splice(0, this.index)
      console.log(JSON.stringify(this.currentItems))
    },
     err => {
       console.error(err.message)
     })
  }

  scrollDown(event) {
    for (var i=this.index; i<this.index+20; i++){
      this.currentItems.push(this.allItems[i])
    }
    this.index += 20
    event.complete()
    console.log(this.currentItems.length)
  }

  certainCoin(id) {
    this.request.coinDetails(id).subscribe(response => {
      console.log(JSON.stringify(response))
    })
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