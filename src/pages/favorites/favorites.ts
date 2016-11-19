import { StoreDetailsPage } from './../store-details/store-details';
import { Store } from './../../models/store.model';
import { FavoriteService } from './../../providers/favorite.service';
import { StoreService } from './../../providers/store.service';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  favoriteStores: Store[];
  stores: Store[];
  store: Store = { id: "", address: "", mapLink: "", image: "", description: "", name: "", phone: "", url: "" };
  loadedStoresList: any;

  constructor(public navCtrl: NavController,
    public storeService: StoreService,
    public favoriteService: FavoriteService) {
    this.GetStoreList();

  }

  ionViewDidEnter() { //will always go to the database
    console.log('ionviewdidenter favorites');
    this.GetFavorites();
  }


  GetFavorites() {
    this.favoriteService.GetFavorites().then((snapshot) => {
      this.favoriteStores = [];
      snapshot.forEach(snap => {
        let storeId = snap.key;
        this.store = this.loadedStoresList.filter(x => x.id == storeId)[0];
        this.favoriteStores.push(this.store);
      });
    })
  }

  GetFavorites2() {
    this.favoriteService.GetFavorites2().subscribe(
      snapshot => {
        this.favoriteStores = [];
        snapshot.forEach(snap => {
          console.log(snap.key);
          this.store = this.loadedStoresList.filter(x => x.id == snap.key)[0];
          this.favoriteStores.push(this.store);
        });
      });
  }

  GetStoreList() {
    this.storeService.GetStoreList().then(snapshot => {
      this.stores = [];
      snapshot.forEach(store => {
        store = store.val();
        this.stores.push(store);
      });
      this.loadedStoresList = this.stores;
    });
  }

  GoToStoreDetails(storeId) {
    this.navCtrl.push(StoreDetailsPage, {
      storeId: storeId,
    });
  }
}
