import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavParams, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import { ImgEditPage } from '../img-edit/img-edit';
import moment from 'moment';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  private form : FormGroup;
  private question_label = null;
  public date = new Date().toISOString();
  public minDate : string; 
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams
    
    ) {

    this.question_label = [
      ['BP_machine'],
      ['Phototaken'],
      ['Photodate'],
      ['time'],
    ]

    this.form = this.formBuilder.group({
      BP_machine: ['', Validators.required],
      Phototaken: ['', Validators.required],
      Photodate: ['', Validators.required],
      Phototime: ['', Validators.required],
      });


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

  goToImgEdit(){
    this.navCtrl.push(ImgEditPage);
  }
}
