import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage }  from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ImgEditPage } from '../img-edit/img-edit';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any;

  constructor(
    platform:     Platform,
    statusBar:    StatusBar,
    splashScreen: SplashScreen
  ) {
    //  TODO
    // Ask if logged in
    this.rootPage = LoginPage;
    // this.rootPage = HomePage;

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
