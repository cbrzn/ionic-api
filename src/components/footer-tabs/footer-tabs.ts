import { Component } from '@angular/core';
import { AccountPage } from '../../pages/account/account';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the FooterTabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-tabs',
  template: `
  <ion-tabs>
    <ion-tab tabIcon="water" tabTitle="Water" [root]="tab1"></ion-tab>
    <ion-tab tabIcon="leaf" tabTitle="Life" [root]="tab2"></ion-tab>
  </ion-tabs>`
})
export class FooterTabsComponent {

  tab1: Page;
  tab2: Page;

  constructor() {
    console.log('Hello FooterTabsComponent Component');
    this.tab1 = HomePage;
    this.tab2 = AccountPage
  }

}