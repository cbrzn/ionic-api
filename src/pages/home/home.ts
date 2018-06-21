import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  
  data = []

  ionViewDidLoad() {
    this.request./*nombre funcion*/.subscribe(response => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        this.data.push(response.data[i]);
      }
      console.log(this.data);
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