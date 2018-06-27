import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from "@ionic-native/native-storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CoinDetailsPage } from '../pages/coin-details/coin-details';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { Sender } from '../providers/sender/sender';
import { HeaderMenuComponent } from '../components/header-menu/header-menu';
import { SessionService } from '../providers/session-service/session-service';
import { AccountPage } from '../pages/account/account';
import { FavoritesPage } from '../pages/favorites/favorites';
import { CalculatorPage } from '../pages/calculator/calculator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CoinDetailsPage,
    LoginPage,
    SignupPage,
    HeaderMenuComponent,
    AccountPage,
    FavoritesPage,
    CalculatorPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CoinDetailsPage,
    LoginPage,
    SignupPage,
    HeaderMenuComponent,
    AccountPage,
    FavoritesPage,
    CalculatorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Sender,
    NativeStorage,
    SessionService
  ]
})

export class AppModule {}
