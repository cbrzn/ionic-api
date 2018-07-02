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
  templateUrl: 'footer-tabs.html'
})
export class FooterTabsComponent {

  tab1: Page;
  tab2: Page;

  constructor() {
    
  }

}