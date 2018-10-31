
import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { SettingsPagePage } from '../settings/settings';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPagePage;


  constructor() {

  }
}
