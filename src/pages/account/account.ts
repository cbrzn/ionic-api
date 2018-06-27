import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SessionService } from '../../providers/session-service/session-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private session: SessionService,
  ) {
  }
  
  user:string = this.session.getUser();

  logout() {
    this.session.setUser(null)
    let alert = this.alertCtrl.create({
      title: 'Logout successful',
      subTitle: 'You have logged out! Hope to see you soon',
      buttons: ['Dismiss']
    });
    alert.present();
    alert.onDidDismiss(() => {
      this.navCtrl.setRoot(HomePage)
    })
  }
  
}
