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
  public base64Image = "";
  private form : FormGroup;
  private question_label = null;
  public date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  public stillUtc = moment.utc(this.date).toDate();
  public local_date = moment(this.stillUtc).local().format('YYYY-MM-DD');
  public local_time = moment(this.stillUtc).local().format('HH:mm:ss');
  public minDate : string; 
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public navParams: NavParams, 
    private config: Config
    
    ) {

    this.question_label = [
      ['BP_machine'],
      ['Phototaken'],
      ['Photodate'],
      ['time'],
      ['image'],
    ]

    this.form = this.formBuilder.group({
      BP_machine: ['', Validators.required],
      Phototaken: ['', Validators.required],
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
    this.navCtrl.push(ImgEditPage);
  }

  public submit(){
    console.log(this.form.valid, this.base64Image)
    if (this.form.valid) {
      // Change Reuslt for special case
      // this.form.controls["1c_13R"].setValue(this.form.value["1a_13R"])
      this.form.controls["image"].setValue(this.base64Image)
      console.log("Final Data", JSON.stringify(this.form.value))
      $.post(this.config.get('server'), {
          which: 'profile',
          type: 'data',
          payload: JSON.stringify(this.form.value)
        }, function(Response){
          console.log(Response)
        })
      this.goToImgEdit();
        // $.post(this.config.get('server'), {
        //   which: 'proforma',
        //   type: 'time',
        //   payload: JSON.stringify(this.timer_stack)
        // }, function(Response){
        //   console.log("Timer", Response)
        // })

    //   this.navCtrl.setRoot(Home.Completion)
    // } else {
    //   for(let question in this.form.controls){
    //     if(!this.form.controls[question].valid){
    //       console.log(question, this.form.controls[question].valid)
    //       if(document.getElementById(question.split("_")[0]) != null){
    //         let yOffset = document.getElementById(question.split("_")[0]).offsetTop
    //         // console.log("yOffset", yOffset);
    //           this.content.scrollTo(0, yOffset, 10)

    //           break  
    //       }
    //     }
    //   }
    }
  }
}
