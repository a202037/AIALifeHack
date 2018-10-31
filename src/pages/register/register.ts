import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController,LoadingController, Select } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import * as $ from 'jquery';
import * as md5 from 'js-md5';
@Component({
  selector:    'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  private question_label = null;
  private form : FormGroup;
  @ViewChild(Select) select: Select;
  validation_messages={
'email':[
{ type:'required', message:'You must enter an email.'},
{ type:'minlength', message:'Minimum 5 characters are required for username.'},
{ type:'maxlength', message:'You can enter a username of maximum 30 characters.'},
{ type:'pattern', message:'You must enter a valid email..'},
{ type:'validUsername', message:'A user with the selected username already exists.'}
],
'pass':[
{ type:'required', message:'This field is required.'},
{ type:'minlength', message:'Minimum 6 characters are required for password.'},
],
'passconfirm':[
{ type:'required', message:'This field is required.'},
{ type:'minlength', message:'Minimum 6 characters are required for password.'},
],

}
  constructor(
    public navCtrl:     NavController, 
    public navParams:   NavParams,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,

  ) {


     this.question_label = [
    ['email'],
    ['pass'], 
    ['passconfirm']

    ]

    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passconfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    },{validator: this.checkIfMatchingPasswords('pass', 'passconfirm')});
  }

  ionViewDidLoad() {
         let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }
  }

  // REGISTER TASKS
  register(){
    // TODO
    // let loader = this.loadingCtrl.create(
    // {spinner: 'crescent'
    // });
    // loader.present();
    // setTimeout(() => {  
    //   loader.dismiss();
    //   this.navCtrl.pop(); 
    // }, 1000);
    var self = this;
    this.form.value['pass'] = md5(this.form.value['pass'])
    this.form.value['passconfirm'] = md5(this.form.value['passconfirm'])
    if (this.form.valid){
      console.log(this.form.value)
      $.ajax({
        method: "POST", 
        url: "http://137.189.62.130:8885/register", 
        crossDomain:true,
        data: {"data": JSON.stringify(this.form.value)},
        success: function(data){   
          console.log(data)
          if(data.success ==  false){
            let alert = self.alertCtrl.create({
                subTitle: "Registration unsuccessful. Your email is already registered.",
                buttons: ["OK"]
              });
              alert.present();
              self.navCtrl.pop();
          } else{
            let alert = self.alertCtrl.create({
                subTitle: "Registration successful",
                buttons: ["OK"]
              });
              alert.present();
              self.navCtrl.pop();
          }
        } 
      })
    } 
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
        }
 }
}
