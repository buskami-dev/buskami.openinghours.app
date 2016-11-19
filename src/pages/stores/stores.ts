import { FavoriteService } from './../../providers/favorite.service';
import { StoreService } from './../../providers/store.service';
import { StoreDetailsPage } from './../store-details/store-details';
import { StoreCreatePage } from './../store-create/store-create';
import { Component } from '@angular/core';
import { NavController, MenuController, ToastController } from 'ionic-angular';
import { Store } from '../../models/store.model';

@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html'
})
export class StoresPage {
  stores: Store[];
  favorites: any[] = [];
  searchTerm: string = "";
  storesList: any;
  loadedStoresList: any;


  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public storeService: StoreService,
    public favoriteService: FavoriteService,
    public menu: MenuController) {

    console.log('constructor stores');
    
  }

  ionViewDidLoad() {
    console.log('ionviewdidload');
    this.GetStoreList();
  }


  GetStores() {
    this.GetStoreFavorites();

    this.stores = [];
    this.storeService.GetList().subscribe(
      store => {
        this.favorites.forEach(favStore => {
          if (store.id == favStore.id) {
            store.isFavorite = true;
          }
        })
        console.log(store);
        this.stores.push(store);
      },
      err => console.error("error GetStores:" + err)
    );
  }

  GetStoreList() {
    this.GetStoreFavorites();

    this.storeService.GetStoreList().then(snapshot => {
      this.stores = [];
      snapshot.forEach(store => {
        store = store.val();
        this.favorites.forEach(favStore => {
          if (store.id == favStore.id) {
            store.isFavorite = true;
          }
        })
        this.stores.push(store);
      });
      this.storesList = this.stores;
      this.loadedStoresList = this.stores;
    });
  }

  GetStoreFavorites() {
    this.favoriteService.GetFavorites().then((snapshot) => {
      snapshot.forEach(favStore => {
        this.favorites.push({ id: favStore.key });
      });
    })
  }

  ToggleFavorite(store: Store) {
    if (!store.isFavorite) {
      this.favoriteService.SaveFavorite(store.id).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Added to favorites',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }
    else {
      this.favoriteService.RemoveFavorite(store.id).then(() => {
        let toast = this.toastCtrl.create({
          message: 'Removed from favorites',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }
    store.isFavorite = !store.isFavorite;
  }

  InitializeStores() {
    this.storesList = this.loadedStoresList;
  }


  GoToStoreDetails(storeId) {
    this.navCtrl.push(StoreDetailsPage, {
      storeId: storeId,
    });
  }

  GoToNewStore() {
    this.navCtrl.push(StoreCreatePage);
  }

  SetFilteredStores() {
    this.InitializeStores();

    if (!this.searchTerm) {
      return;
    }

    this.storesList = this.storesList.filter((store) => {
      if (store.name && this.searchTerm) {
        return store.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      }
    });
  }
}




