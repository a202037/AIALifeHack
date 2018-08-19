import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector:    'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
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

  // REGISTER TASKS
  register(){
    // TODO
    let loader = this.loadingCtrl.create(
    {spinner: 'crescent'
    });
    loader.present();

    // IF SUCCESS RETURN TO LOGIN PAGE
    setTimeout(() => {  //  THIS TIMEOUT IS UNNECESSARY, IT'S JUST FOR THE EXAMPLE
      loader.dismiss();
      this.navCtrl.pop();  //  RETURN TO LOGIN PAGE
    }, 1000);
  }

}
