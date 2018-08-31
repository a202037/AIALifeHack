import { Component, ViewChild} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config, NavParams, NavController, AlertController, LoadingController, Select} from 'ionic-angular';
import {Camera} from 'ionic-native';
import { ImgEditPage } from '../img-edit/img-edit';
import { LoginPage } from '../login/login';
import { ReportPagePage } from '../report/report';
import moment from 'moment';
import * as $ from 'jquery';
import { ImgDetailsPagePage } from '../img-details/img-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image = "";
  private form : FormGroup;
  private question_label = null;
  public BP_record : any;
  public hash : string; 
  @ViewChild(Select) select: Select;
  constructor( 
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams, 
    private config: Config,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
 

    
    ) {

    this.question_label = [
    ['BP_machine_model'],
    ['image'], 
    ['hash'],
    ]

    this.form = this.formBuilder.group({
      BP_machine_model: ['', Validators.required],
      image: [''],
      hash: [''],
    });

    this.hash = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  //generate unique string with length 11 and combination of digits and characters
}

takePicture(){
  var self = this;
  if (this.form.valid) {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;

      self.submit();
    }, (err) => {
      console.log(err);
    });
    
  } else{
    let alert = self.alertCtrl.create({
      title: "Error",
      subTitle: "Please selcet machine model.",
      buttons: ["OK"]
    });
    this.select.open();
    alert.present();
     
  }

}

accessGallery(){
  var self = this;
  if (this.form.valid) {
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;

     self.submit()
    }, (err) => {
      console.log(err);
    });

  } else{
    let alert = self.alertCtrl.create({
      title: "Error",
      subTitle: "Please selcet machine model.",
      buttons: ["OK"]
    });
    this.select.open();
    alert.present();

    

  }
} 

reload(){
  this.navCtrl.setRoot(this.navCtrl.getActive().component);
}

// goToImgDetails(){ 

//       // Change Reuslt for special case
//       this.form.controls["image"].setValue(this.base64Image)
//       this.form.controls["hash"].setValue(this.hash)
//       //console.log("FinalData", JSON.stringify(this.form.value))

//       this.navCtrl.setRoot(ImgDetailsPagePage, { 
//         data: this.form.value,
//       });
//     }


    goToImgEdit(){
      this.navCtrl.setRoot(ImgEditPage, { 
        BP_record: this.BP_record, 
        hash: this.hash,
        base64Image: this.base64Image,
      });
    }

    logout(){
      this.navCtrl.setRoot(LoginPage);

    }

    goToReport(){
      this.navCtrl.setRoot(ReportPagePage);

    }

     public submit(){
       this.form.controls["image"].setValue(this.base64Image)
       this.form.controls["hash"].setValue(this.hash)
      var self = this;
      let loader = this.loadingCtrl.create({spinner: 'crescent'
      });
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
             self.reload();

           } else {
             self.BP_record = data
             self.goToImgEdit()
           }           
         }
       })
      
    
  }


  }
