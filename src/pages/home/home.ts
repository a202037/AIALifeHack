import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Config, NavParams, NavController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import { ImgEditPage } from '../img-edit/img-edit';
import moment from 'moment';
import * as $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image = "fdfdggfddf";
  private form : FormGroup;
  private question_label = null;
  public date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  public stillUtc = moment.utc(this.date).toDate();
  public local_date = moment(this.stillUtc).local().format('YYYY-MM-DD');
  public local_time = moment(this.stillUtc).local().format('HH:mm:ss');
  public minDate : string; 
  public BP_record : any 
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams, 
    private config: Config
    
    ) {

    this.question_label = [
      ['BP_machine_model'],
      ['Phototaken_now'],
      ['Photodate'],
      ['time'],
      ['image'],
    ]

    this.form = this.formBuilder.group({
      BP_machine_model: ['', Validators.required],
      Phototaken_now: ['', Validators.required],
      Photodate: [''],
      Phototime: [''],
      image: [''],
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
    this.navCtrl.push(ImgEditPage, {
    data: this.BP_record
    });
  }

  public submit(){
    console.log(this.form.valid, this.base64Image)
    if (this.form.valid) {
      // Change Reuslt for special case
      // this.form.controls["1c_13R"].setValue(this.form.value["1a_13R"])
      this.form.controls["image"].setValue(this.base64Image)
      console.log("FinalData", JSON.stringify(this.form.value))
      $.post(this.config.get('server'), {
          // which: 'profile',
          type: 'json',
          payload: JSON.stringify(this.form.value)
        }, function(Response){
          this.BP_record = Response
          console.log(this.BP_record)
        })

      this.goToImgEdit();
    }
  }
}
