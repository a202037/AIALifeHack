import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
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
    // let loader = this.loadingCtrl.create(
    //   {spinner: 'crescent'
    // });
    // loader.present();

    // setTimeout(() => {  
    //   loader.dismiss();
    //   this.navCtrl.setRoot(HomePage, {}, { animate: true });  
    // }, 1000);
    //console.log(this.formData)
      $.ajax({
        method: "POST", 
        url: "http://137.189.62.130:8885/login", 
        crossDomain:true,
        data: {"data": JSON.stringify(this.formData)},
        success: function(data){
   
          
           console.log(data)

         
         }
      })
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
