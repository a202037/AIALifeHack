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
		SBP_json = {
		    hundreds: [
		      {description: '0'},
		      {description: '1'},
		      {description: '2'}
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
		};
		DBP_json = {
		    hundreds: [
		      {description: '0'},
		      {description: '1'},
		      {description: '2'}
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
		};
		HR_json = {
		    hundreds: [
		      {description: '0'},
		      {description: '1'},
		      {description: '2'}
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
		};
		public SBP = '123'; 
		public DBP = '123'; 
		public HR = '123'; 
		posts: any;

		constructor(
			public navCtrl: NavController, 
			public navParams: NavParams, 
			private selector: WheelSelector,
			private toastCtrl: ToastController) {
			// this.http.get('http://137.189.62.130:8885/receiver', {}, {}).then(data => {
		 //    console.log(data.status);
		 //    console.log(data.data); // data received by server
		 //    console.log(data.headers);

		 //  })
		 //  .catch(error => {

		 //    console.log(error.status);
		 //    console.log(error.error); // error message as string
		 //    console.log(error.headers);

		 //  });

		}
		
		SBP_select() {
	    this.selector.show({
	      title: 'Select SBP',
	      items: [
	        this.SBP_json.hundreds,
	        this.SBP_json.tens,
	        this.SBP_json.units

	      ],
	      positiveButtonText: 'Select',
	      negativeButtonText: 'Cancel',
	      defaultItems: [ 
	        { index: 0, value: this.SBP[0] },
	        { index: 1, value: this.SBP[1] },
	        { index: 2, value: this.SBP[2] }
	      ]
	    }).then(
	      (result) => {
	        let msg = `Selected ${result[0].description}${result[1].description}${result[2].description}`;
	        this.SBP = result[0].description;
	        this.SBP += result[1].description;
	        this.SBP += result[2].description;
	 
	        let toast = this.toastCtrl.create({
	          message: msg,
	          duration: 4000
	        }); 
	        // this.SBP = ${result[0].description}${result[1].description}${result[2].description}
	        toast.present();
	      }, 
	      err => console.log('Error: ', err)
	      );
	    
 		}

 		DBP_select() {
	    this.selector.show({
	      title: 'Select DBP',
	      items: [
	        this.DBP_json.hundreds,
	        this.DBP_json.tens,
	        this.DBP_json.units

	      ],
	      positiveButtonText: 'Select',
	      negativeButtonText: 'Cancel',
	      defaultItems: [ 
	        { index: 0, value: this.DBP[0] },
	        { index: 1, value: this.DBP[1] },
	        { index: 2, value: this.DBP[2] }
	      ]
	    }).then(
	      result => {
	        let msg = `Selected ${result[0].description}${result[1].description}${result[2].description}`;
	        this.DBP = result[0].description;
	        this.DBP += result[1].description;
	        this.DBP += result[2].description;
	        let toast = this.toastCtrl.create({
	          message: msg,
	          duration: 4000
	        }); 
	        // this.SBP = ${result[0].description}${result[1].description}${result[2].description}
	        toast.present();
	      }, 
	      err => console.log('Error: ', err)
	      );
	    
 		}

 		HR_select() {
	    this.selector.show({
	      title: 'Select HR',
	      items: [
	        this.HR_json.hundreds,
	        this.HR_json.tens,
	        this.HR_json.units

	      ],
	      positiveButtonText: 'Select',
	      negativeButtonText: 'Cancel',
	      defaultItems: [ 
	        { index: 0, value: this.HR[0] },
	        { index: 1, value: this.HR[1] },
	        { index: 2, value: this.HR[2] }
	      ]
	    }).then(
	      result => {
	        let msg = `Selected ${result[0].description}${result[1].description}${result[2].description}`;
	        this.HR = result[0].description;
	        this.HR += result[1].description;
	        this.HR += result[2].description;
	        let toast = this.toastCtrl.create({
	          message: msg,
	          duration: 4000
	        }); 
	        // this.SBP = ${result[0].description}${result[1].description}${result[2].description}
	        toast.present();
	      }, 
	      err => console.log('Error: ', err)
	      );
	    
 		}

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ImgEditPage');
  }


