import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import * as $ from 'jquery';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { ForgotPassPage } from '../forgot-pass/forgot-pass';

@Component({
  selector:    'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  //public formData: any;
  private question_label = null;
  private form : FormGroup;
  constructor( 
    public navCtrl:     NavController, 
    public navParams:   NavParams,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
  ) {
    //this.formData = { }; 
    this.question_label = [
    ['email'],
    ['pass'], 

    ]

    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      pass: ['', Validators.compose([Validators.required])],
    });
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
    //console.log(this.form.valid)
    var self = this;
    if (this.form.valid){
      $.ajax({
        method: "POST", 
        url: "http://137.189.62.130:8885/login", 
        crossDomain:true,
        data: {"data": JSON.stringify(this.form.value)},
        success: function(data){   
           console.log(data)
           if(data['email'] == true && data['email'] == true){
             self.navCtrl.setRoot(HomePage);  

           } 

         
         }
      })
  } }

  // GO TO FORGOT PASSWORD PAGE
  goToForgotPass(){
    this.navCtrl.push(ForgotPassPage);
  }

  // GO TO REGISTER PAGE
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

}
