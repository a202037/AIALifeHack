import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgotPassPage } from '../forgot-pass/forgot-pass';

@Component({
  selector:    'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public formData: any;

  constructor( 
    public navCtrl:     NavController, 
    public navParams:   NavParams,
    public loadingCtrl: LoadingController
  ) {
    this.formData = { };
  }

  ionViewDidLoad() {
  }

  // LOGIN TASKS
  login(){
    // TODO
    let loader = this.loadingCtrl.create(
      {spinner: 'crescent'
    });
    loader.present();

    
    // IF SUCCESS GO TO HOME PAGE
    setTimeout(() => {  // THIS TIMEOUT IS UNNECESSARY, IT'S JUST FOR THE EXAMPLE
      loader.dismiss();
      this.navCtrl.setRoot(HomePage, {}, { animate: true });  // GO TO HOME PAGE
    }, 1000);
  }

  // GO TO FORGOT PASSWORD PAGE
  goToForgotPass(){
    this.navCtrl.push(ForgotPassPage);
  }

  // GO TO REGISTER PAGE
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
