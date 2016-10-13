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
  favoriteStores: Store[] = [];

  constructor(public navCtrl: NavController,
    public storeService: StoreService,
    public favoriteService: FavoriteService) {
    this.GetFavoriteStores();
  }

  GetFavoriteStores() {
    this.favoriteService.GetFavorites().then((snapshot) => {
      ;
      snapshot.forEach(snap => {
        let storeId = snap.key;
        this.favoriteStores.push(this.storeService.GetDetails(storeId));
      });
    })
  }

  GoToStoreDetails(storeId) {
    this.navCtrl.push(StoreDetailsPage, {
      storeId: storeId,
    });
  }


}
