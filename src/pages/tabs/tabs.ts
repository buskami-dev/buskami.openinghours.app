import { StoresPage } from './../stores/stores';
import { Component } from '@angular/core';
import { FavoritesPage } from '../favorites/favorites';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;

  constructor() {
    this.tab1Root = StoresPage;
    this.tab2Root = FavoritesPage;
    this.tab3Root = ProfilePage;
  }
}
