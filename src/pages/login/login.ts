import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NativeStorage } from "@ionic-native/native-storage";
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SessionService } from '../../providers/session-service/session-service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private user: FormGroup
  username: string = ''
  constructor(
    private formBuilder: FormBuilder, 
    private nativeStorage: NativeStorage, 
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private session: SessionService
  ) {
    this.user = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm() {
    const { username, password } = this.user.value
    this.nativeStorage.getItem(username).then(data => {
      if (password == data.password) {
        let alert = this.alertCtrl.create({
          title: 'Log in successful',
          subTitle: 'You have logged! Welcome',
          buttons: ['Dismiss']
          })
          alert.present();
          alert.onDidDismiss(() => {
            this.session.setUser(username)
            this.navCtrl.setRoot(HomePage, {
              username
            })
          })
        } else {
          let alert = this.alertCtrl.create({
            title: 'Log in failed',
            subTitle: 'Wrong password',
            buttons: ['Dismiss']
          })
          alert.present() 
        }
    }, error => {
        let alert = this.alertCtrl.create({
          title: 'Log in failed',
          subTitle: 'User does not exist',
          buttons: ['Dismiss']
        })
        alert.present()  
      }
    )
  }

      clear() {
        this.nativeStorage.clear()
      }
  }


