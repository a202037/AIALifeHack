import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage }  from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ImgEditPage } from '../img-edit/img-edit';
import { Storage } from '@ionic/storage';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage: any;

  constructor(
    platform:     Platform,
    statusBar:    StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage,
    ) {
    //  TODO
    
    //this.rootPage = LoginPage;
    // this.rootPage = HomePage;

    platform.ready().then(() => {
      statusBar.hide();
      splashScreen.hide();
      this.storage.get('login').then((val) => {

        if (val === 'false')
          { console.log('not logged in');
        this.rootPage = LoginPage;
      }
      else
      {
        console.log('already logged in');
        this.rootPage = TabsPage;
      }
    });

    });
  }
}
