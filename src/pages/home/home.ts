import { Component } from '@angular/core';

import { NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import { ImgEditPage } from '../img-edit/img-edit';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  constructor(public navCtrl: NavController
    
    ) {
    
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

  goToImgEdit(){
    this.navCtrl.push(ImgEditPage);
  }
}
