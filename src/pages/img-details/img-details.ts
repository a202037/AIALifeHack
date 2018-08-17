import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config, NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import { ImgEditPage } from '../img-edit/img-edit';
import { HomePage } from '../home/home';
import moment from 'moment';

@Component({
  selector: 'page-img-details',
  templateUrl: 'img-details.html'
})
export class ImgDetailsPagePage {
  	public base64Image : string;
  	public data : any ; 
  	public BP_record : any;
     private form : FormGroup;
  private question_label = null;
  public date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  public stillUtc = moment.utc(this.date).toDate();
  public local_date = moment(this.stillUtc).local().format('YYYY-MM-DD');
  public local_time = moment(this.stillUtc).local().format('HH:mm:ss');
  public minDate : string; 

  constructor( 
  	public navCtrl: NavController,
    public navParams: NavParams, 
    private config: Config,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    ) {
     this.question_label = [
    ['BP_machine_model'],
    ['image'], 
    ['hash'],
    ['Photodate'],
    ['Phototime']
    ]

    this.form = this.formBuilder.group({
      BP_machine_model: [''],
      image: [''],
      hash: [''],
      Photodate: [''],
      Phototime: [''],

    });
  	this.data = navParams.get('data');
  	this.base64Image = this.data.image


  }

   goToImgEdit(){
      this.navCtrl.setRoot(ImgEditPage, { 
        data: this.data,
        BP_record:this.BP_record,  
      });
    }
    getCurrentTime() {
    return this.minDate = moment.utc().startOf('day').format('YYYY-MM-DD');
    }
    goToHome(){
    	this.navCtrl.setRoot(HomePage);

    }

 public submit(){
       this.form.controls["image"].setValue(this.base64Image)
       this.form.controls["BP_machine_model"].setValue(this.data.BP_machine_model)
       this.form.controls["hash"].setValue(this.data.hash)

      var self = this;
      let loader = this.loadingCtrl.create();
        loader.present();
        console.log(JSON.stringify(this.form.value))
      $.ajax({
        method: "POST", 
        url: "http://137.189.62.130:8885/receiver", 
        data: {"data": JSON.stringify(this.form.value)},
        success: function(data){
          loader.dismiss();  
          
           //console.log(data.DBP_record)


           if(data.DBP_record == -1 && data.SBP_record == -1 && data.HR_record == -1){
             let alert = self.alertCtrl.create({
               title: "Error",
               subTitle: "Image cannot be recognized. Please take a new one.",
               buttons: ["OK"]
             });
             alert.present();
             self.goToHome()

           } else {
             self.BP_record = data
             self.goToImgEdit()
           }           
         }
       })
      
    
  }

}
