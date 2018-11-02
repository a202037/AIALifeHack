import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController, Select } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';  
import * as $ from 'jquery';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { ForgotPassPage } from '../forgot-pass/forgot-pass';
import * as md5 from 'js-md5';
import { Storage } from '@ionic/storage';

@Component({
  selector:    'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  //public formData: any;
  private question_label = null;
  private form : FormGroup;
  @ViewChild(Select) select: Select;
  validation_messages = {
'username': [
    { type: 'required', message: 'Username is required.' },
    { type: 'minlength', message: 'Username must be at least 5 characters long.' },
    { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
    { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    { type: 'validUsername', message: 'Your username has already been taken.' }
  ],
  'name': [
    { type: 'required', message: 'Name is required.' }
  ],
};
  constructor( 
    public navCtrl:     NavController, 
    public navParams:   NavParams,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private storage: Storage,
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
     let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }
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
      
      var self = this;
      this.form.value['pass'] = md5(this.form.value['pass'])
      if (this.form.valid){
        $.ajax({
          method: "POST", 
          url: "http://137.189.62.130:8885/login", 
          crossDomain:true,
          data: {"data": JSON.stringify(this.form.value)},
          success: function(data){   
            console.log(data)
            if(data['email'] == true && data['pass'] == true){
              self.navCtrl.setRoot(TabsPage);  
              self.storage.set('login', 'true');
            } else{
              let alert = self.alertCtrl.create({
                subTitle: "Please fill in correct email/password",
                buttons: ["OK"]
              });
              alert.present();
            }
          } 
        })
      } else {
        let alert = self.alertCtrl.create({
          subTitle: "Please fill in correct email/password",
          buttons: ["OK"]
        });
        alert.present();
      }
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
