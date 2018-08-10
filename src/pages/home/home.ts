import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config, NavParams, NavController, AlertController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import { ImgEditPage } from '../img-edit/img-edit';
import moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image = "";
  private form : FormGroup;
  private question_label = null;
  public date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  public stillUtc = moment.utc(this.date).toDate();
  public local_date = moment(this.stillUtc).local().format('YYYY-MM-DD');
  public local_time = moment(this.stillUtc).local().format('HH:mm:ss');
  public minDate : string; 
  public BP_record : any;
  public hash : string; 
  constructor( 
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams, 
    private config: Config,
    private alertCtrl: AlertController
    
    ) {

    this.question_label = [
      ['BP_machine_model'],
      ['Photodate'],
      ['time'],
      ['image'],
      ['hash'],
    ]

    this.form = this.formBuilder.group({
      BP_machine_model: ['', Validators.required],
      Photodate: ['', Validators.required],
      Phototime: ['', Validators.required],
      image: [''],
      hash: [''],
      });

    this.hash = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
  //generate unique string with length 11 and combination of digits and characters
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
    

  }

  accessGallery(){
    Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);
    });
    
  } 

  getCurrentTime() {
    return this.minDate = moment.utc().startOf('day').format('YYYY-MM-DD');
}

  reload(){
   this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  goToImgEdit(){
    this.navCtrl.push(ImgEditPage, { 
    BP_record: this.BP_record, 
    hash: this.hash,
    base64Image: this.base64Image,
    });
  }

  public submit(){
    var self = this;
    console.log(this.form.valid, this.base64Image, this.hash)
    if (this.form.valid) {
      // Change Reuslt for special case
      this.form.controls["image"].setValue(this.base64Image)
      this.form.controls["hash"].setValue(this.hash)
      console.log("FinalData", JSON.stringify(this.form.value))
      // $.post(this.config.get('server'), {
      //     // which: 'profile',
      //     type: 'json',
      //     payload: JSON.stringify(this.form.value)
      //   }, function(Response){
      //     this.BP_record = Response
      //     console.log(this.BP_record) 
      //     },callback()
      //     )
       $.ajax({
         method: "POST", 
         url: "http://137.189.62.130:8885/receiver", 
         data: {"data":JSON.stringify(this.form.value)},
         success: function(data){
           console.log(data.DBP_record)
           if(data.DBP_record == -1 && data.SBP_record == -1 && data.HR_record == -1){
             let alert = self.alertCtrl.create({
                  title: "Error",
                  subTitle: "Image cannot be recognized. Please take a new one.",
                  buttons: ["OK"]
              });
             self.reload();
             this.hash = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toString();
              alert.present();

           } else {
             self.BP_record = data
             self.goToImgEdit()
           }           
         }
       })
      
    }
  }

}
