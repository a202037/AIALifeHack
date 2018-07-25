import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 public base64Image: string;
  constructor(public navCtrl: NavController) {
    
  }
 takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        quality: 100
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
}
