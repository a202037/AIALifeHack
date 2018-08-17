import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ToastController } from 'ionic-angular';

import { LoginPage }    from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass';
import { ImgEditPage } from '../pages/img-edit/img-edit';
import { HomePage }     from '../pages/home/home';
import { ImgDetailsPagePage }     from '../pages/img-details/img-details';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { WheelSelector } from '@ionic-native/wheel-selector';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    ImgEditPage,
    ImgDetailsPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPassPage,
    ImgEditPage,
    ImgDetailsPagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    WheelSelector,
    ToastController,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
