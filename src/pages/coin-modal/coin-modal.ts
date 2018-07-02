import { Component } from '@angular/core';

import { ModalController } from 'ionic-angular';


@Component({
  selector: 'coin-modal',
  templateUrl: 'coin-modal.html'
})
export class CoinModalPage {

  constructor(public modalCtrl: ModalController) { }

  openModal(coin) {

    let modal = this.modalCtrl.create(CoinModalPage, coin);
    modal.present();
  }
}
