import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { ToastController } from 'ionic-angular';
import * as $ from 'jquery';
import { HomePage } from '../home/home';
import moment from 'moment';
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
    public data : any; 
  	public BP_record : any; 
  	public hash : string;
  	public base64Image : string;
    private form : FormGroup;
    private question_label = null;
    public date = moment.utc().format('YYYY-MM-DD HH:mm:ss');
    public stillUtc = moment.utc(this.date).toDate();
    public local_date = moment(this.stillUtc).local().format('YYYY-MM-DD');
    public local_time = moment(this.stillUtc).local().format('HH:mm:ss');
    public minDate : string; 
  	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams, 
  		private selector: WheelSelector,
      public loadingCtrl: LoadingController,
      private formBuilder: FormBuilder,
  		private toastCtrl: ToastController) {
      this.question_label = [
      ['Photodate'],
      ['Phototime'],
      ['DBP'],
      ['SBP'],
      ['HR'],
      ['hash']
      ]

      this.form = this.formBuilder.group({
        Photodate: [''],
        Phototime: [''],
        DBP: [''],
        SBP: [''],
        HR: [''],
        hash: [''],

      });

  		this.BP_record = navParams.get('BP_record')
  		this.hash = navParams.get('hash')
  		this.base64Image = navParams.get('base64Image')
  		this.SBP = this.BP_record['SBP_record'].toString()
  		this.DBP = this.BP_record['DBP_record'].toString() 
  		this.HR = this.BP_record['HR_record'].toString()
  		if(this.SBP == "-1"){
				this.SBP = (Math.floor(Math.random() * 50) + 110).toString()   //110-160
			} 
			if(this.DBP == "-1"){
				this.DBP = (Math.floor(Math.random() * 40) + 60).toString()   //60-100
			}
			if(this.HR == "-1"){
				this.HR = (Math.floor(Math.random() * 90) + 60).toString()   //60-150
			} 

		if(this.SBP.length == 2){
			this.SBP = "0" + this.SBP;
		}
		if(this.DBP.length == 2){
			this.DBP = "0" + this.DBP;
		}
		if(this.HR.length == 2){
			this.HR = "0" + this.HR;
		}
		console.log(this.SBP,this.DBP, this.HR, this.hash, this.BP_record) 
		}
		
		SBP_select() {
			this.selector.show({
				title: 'Edit SBP',
				items: [
				this.SBP_json.hundreds,
				this.SBP_json.tens,
				this.SBP_json.units

				],
				positiveButtonText: 'Select',
				negativeButtonText: 'Cancel',
        wrapWheelText: true, 
				theme: 'dark',
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
	        //toast.present();
	    }, 
	    err => console.log('Error: ', err)
	    );

		}

		DBP_select() {
			this.selector.show({
				title: 'Edit DBP',
				theme: 'dark',
				items: [
				this.DBP_json.hundreds,
				this.DBP_json.tens,
				this.DBP_json.units

				],
				positiveButtonText: 'Select',
        wrapWheelText: true,
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
	        //toast.present();
	    }, 
	    err => console.log('Error: ', err)
	    );

		}

		HR_select() {
			this.selector.show({
				title: 'Edit HR',
				theme: 'dark',
				items: [
				this.HR_json.hundreds,
				this.HR_json.tens,
				this.HR_json.units

				],
				positiveButtonText: 'Select',
        wrapWheelText: true,
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
	        //toast.present();
	    }, 
	    err => console.log('Error: ', err)
	    );

		}
    
		goToHome(){
    	this.navCtrl.setRoot(HomePage);
  	}

    getCurrentTime() {
    return this.minDate = moment.utc().startOf('day').format('YYYY-MM-DD');
    }

		public submit(){
		var self = this;
		// var regex = /0/gi;
		// this.SBP = this.SBP.replace(regex, '')
		// this.DBP = this.DBP.replace(regex, '')
		// this.HR = this.HR.replace(regex, '')
    let loader = this.loadingCtrl.create({spinner: 'crescent'
      });
        loader.present();
		console.log(this.SBP, this.DBP, this.HR, this.hash)
    this.form.controls["DBP"].setValue(this.DBP)
    this.form.controls["HR"].setValue(this.HR)
    this.form.controls["SBP"].setValue(this.SBP)
    this.form.controls["hash"].setValue(this.hash)
      $.ajax({
      	method: "POST", 
      	url: "http://137.189.62.130:8885/update", 
      	data: {record: JSON.stringify(this.form.value)},
      	success: function(data){
          loader.dismiss()
      		console.log(data)
      		self.goToHome()
      	}
      })
      
	  
	}


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ImgEditPage');
}


