import { Component, ViewChild } from '@angular/core';
import { Platform, Events, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { SessionService } from '../providers/session-service/session-service';
import { CalculatorPage } from '../pages/calculator/calculator';

@Component({
  templateUrl: 'app.html',
  providers: [SessionService]
})
export class MyApp {
  @ViewChild('root') navigate: NavController;
  rootPage:any = HomePage;

  constructor(
    public events: Events, 
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
  ) {
    events.subscribe('user:login', () => {
      this.goToLogin()
    })

    events.subscribe('user:signup', () => {
      this.goToSignup()
    })

    events.subscribe('plus:calc', () => {
      this.goToCalc()
    })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide()
    })
  }

  goToLogin() {
    this.navigate.push(LoginPage)
  }

  goToSignup() {
    this.navigate.push(SignupPage)
  }

  goToCalc() {
    this.navigate.push(CalculatorPage)
  }
}

