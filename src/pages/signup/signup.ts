import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NativeStorage } from "@ionic-native/native-storage";
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SessionService } from '../../providers/session-service/session-service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private user: FormGroup
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private nativeStorage: NativeStorage,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private session: SessionService
  ) {
      this.user = this.formBuilder.group({
        username: [''],
        password: [''],
        password_confirmation: ['']
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage')
  }

  signUp() {
    const { username, password, password_confirmation } = this.user.value
    if (username == "" || password == "" || password_confirmation == "") {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'All fields must be filled',
        buttons: ['Dismiss']
      })
      alert.present()
    } else {
      if (password === password_confirmation) {
        this.nativeStorage.getItem(username).then(data => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'You are already registered',
            buttons: ['Dismiss']
          })
          alert.present();
        }, error => {
          this.nativeStorage.setItem(username, {
            password
          }).then(() => {
            let alert = this.alertCtrl.create({
              title: 'Register successful',
              subTitle: 'Welcome! You are now registered & logged in',
              buttons: ['Dismiss']
            })            
            alert.present()
            alert.onDidDismiss(() => {
              this.session.setUser(username)
              this.navCtrl.setRoot(HomePage, {
                username
              })
            })
          },
          error => {
            console.error("Error storing item", error)
          })
        })
      } else {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: `Passwords doesn't match`,
          buttons: ['Dismiss']
        })
        alert.present()
      }
    }
  } 
}
  