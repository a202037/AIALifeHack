import { Component } from '@angular/core';
import { Config, NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import { ImgEditPage } from '../img-edit/img-edit';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-img-details',
  templateUrl: 'img-details.html'
})
export class ImgDetailsPagePage {
  	public base64Image : string;
  	public data : any ; 
  	public BP_record : any;

  constructor( 
  	public navCtrl: NavController,
    public navParams: NavParams, 
    private config: Config,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
  	this.data = navParams.get('data');
  	this.base64Image = this.data.image


  }

   goToImgEdit(){
      this.navCtrl.setRoot(ImgEditPage, { 
        data: this.data,
        BP_record:this.BP_record,  
      });
    }

    goToHome(){
    	this.navCtrl.setRoot(HomePage);

    }

 public submit(){
      var self = this;
      let loader = this.loadingCtrl.create();
        loader.present();
        console.log(JSON.stringify(this.data))
      $.ajax({
        method: "POST", 
        url: "http://137.189.62.130:8885/receiver", 
        data: {"data": JSON.stringify(this.data)},
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
