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
  constructor(
    private formBuilder: FormBuilder, 
    private nativeStorage: NativeStorage, 
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private session: SessionService
  ) {
    this.user = this.formBuilder.group({
      log_username: [''],
      log_password: [''],
      sign_username: [''],
      sign_password: [''],
      sign_password_confirmation: ['']
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  logForm() {
    const { log_username, log_password } = this.user.value
    console.log(log_username, log_password)
    this.nativeStorage.getItem(log_username).then(data => {
      console.log(data)
      if (log_password == data.sign_password) {
        let alert = this.alertCtrl.create({
          title: 'Log in successful',
          subTitle: 'You have logged! Welcome',
          buttons: ['Dismiss']
          })
          alert.present();
          alert.onDidDismiss(() => {
            this.session.setUser(log_username)
            this.navCtrl.setRoot(HomePage, {
              log_username
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

  signUp() {
    const { sign_username, sign_password, sign_password_confirmation } = this.user.value
    if (sign_username == "" || sign_password == "" || sign_password_confirmation == "") {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'All fields must be filled',
        buttons: ['Dismiss']
      })
      alert.present()
    } else {
      if (sign_password === sign_password_confirmation) {
        this.nativeStorage.getItem(sign_username).then(data => {
          let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'You are already registered',
            buttons: ['Dismiss']
          })
          alert.present();
        }, error => {
          this.nativeStorage.setItem(sign_username, {
            sign_password
          }).then(() => {
            let alert = this.alertCtrl.create({
              title: 'Register successful',
              subTitle: 'Welcome! You are now registered & logged in',
              buttons: ['Dismiss']
            })
            alert.present()
            alert.onDidDismiss(() => {
              this.session.setUser(sign_username)
              this.navCtrl.setRoot(HomePage, {
                sign_username
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


