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


  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public storeService: StoreService,
    public favoriteService: FavoriteService,
    public menu: MenuController) {

    //this.GetStores();
  }

  ionViewDidLoad() {
    this.SearchStore();
  }


  GetStores() {
    this.GetFavorites();

    this.stores = [];
    this.storeService.GetList().subscribe(
      store => {
        this.favorites.forEach(favStore => {
          if (store.id == favStore.id) {
            store.isFavorite = true;
          }
        })
        this.stores.push(store);
      },
      err => console.error("error GetStores:" + err)
    );
  }

  GetFavorites() {
    this.favoriteService.GetFavorites().then((snapshot) => {
      snapshot.forEach(snap => {
        this.favorites.push({ id: snap.key });
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


  GoToStoreDetails(storeId) {
    this.navCtrl.push(StoreDetailsPage, {
      storeId: storeId,
    });
  }

  GoToNewStore() {
    this.navCtrl.push(StoreCreatePage);
  }

  SearchStore() {
    console.log(this.searchTerm);
    if (this.searchTerm != "")
    {
      console.log('searching');
      this.stores = this.stores.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }
    else
    {
      console.log('get all');
      this.GetStores();
    }
  }
}




