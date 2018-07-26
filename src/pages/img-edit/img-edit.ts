import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the ImgEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-img-edit',
  templateUrl: 'img-edit.html'
})
	export class ImgEditPage {
		SBP = {
		    hundreds: [
		      {description: '0'},
		      {description: '1'},
		      {description: '2'},
		      {description: '3'},
		      {description: '4'},
		      {description: '5'},
		      {description: '6'},
		      {description: '7'},
		      {description: '8'},
		      {description: '9'}
		    ],
		    tens: [
		     {description: '0'},
		     {description: '1'},
		     {description: '2'},
		     {description: '3'},
		     {description: '4'},
		     {description: '5'},
		     {description: '6'},
		     {description: '7'},
		     {description: '8'},
		     {description: '9'}
		    ],
		    units: [
		     {description: '0'},
		     {description: '1'},
		     {description: '2'},
		     {description: '3'},
		     {description: '4'},
		     {description: '5'},
		     {description: '6'},
		     {description: '7'},
		     {description: '8'},
		     {description: '9'}
		     ]
		}
		constructor(
			public navCtrl: NavController, 
			public navParams: NavParams, 
			private selector: WheelSelector,
			private toastCtrl: ToastController) {
		}
		
		openPicker() {
	    this.selector.show({
	      title: 'Select SBP',
	      items: [
	        this.SBP.hundreds,
	        this.SBP.tens,
	        this.SBP.units

	      ],
	      positiveButtonText: 'Select',
	      negativeButtonText: 'Cancel',
	      defaultItems: [ 
	        { index: 0, value: this.SBP.hundreds[4].description },
	        { index: 1, value: this.SBP.tens[1].description},
	        { index: 2, value: this.SBP.units[1].description}
	      ]
	    }).then(
	      result => {
	        let msg = `Selected ${result[0].description}${result[1].description}${result[2].description}`;
	        let toast = this.toastCtrl.create({
	          message: msg,
	          duration: 4000
	        });
	        toast.present();
	      },
	      err => console.log('Error: ', err)
	      );
 		}

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ImgEditPage');
  }


