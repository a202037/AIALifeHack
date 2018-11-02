import { Component } from '@angular/core';
import { Config, NavParams, NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
/*
  Generated class for the ReportPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPagePage {

  constructor(
  	public navCtrl: NavController,
    public navParams: NavParams, 
    private config: Config,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage,) {
  	
  }

  goToHome(){
    this.storage.set('login', 'false');
    	this.navCtrl.setRoot(HomePage);
      

    }

}
