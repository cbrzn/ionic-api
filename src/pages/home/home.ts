import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SenderProvider } from "../../providers/sender/sender";
import { NativeStorage } from "@ionic-native/native-storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
  	public navCtrl: NavController,
  	private request: SenderProvider,
  	private nativeStorage: NativeStorage) {
  }
  
  data = []

  ionViewDidLoad() {
    this.request.testing().subscribe(response => {
      console.log(response);
    });
  }

  set() {
    this.nativeStorage
      .setItem("myitem", {test:'test'}	)
      .then(() => {console.log("Stored item!");},
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