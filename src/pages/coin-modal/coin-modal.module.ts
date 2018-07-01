import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinModalPage } from './coin-modal';

@NgModule({
  declarations: [
    CoinModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinModalPage),
  ],
})
export class CoinModalPageModule {}
