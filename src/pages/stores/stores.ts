import { FavoriteService } from './../../providers/favorite.service';
import { AuthDataService } from './../../providers/authdata.service';
import { StoreService } from './../../providers/store.service';
import { StoreDetailsPage } from './../store-details/store-details';
import { StoreCreatePage } from './../store-create/store-create';
import { Component } from '@angular/core';
import { NavController , MenuController, ToastController} from 'ionic-angular';
import { Store } from '../../models/store.model';

@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html'
})
export class StoresPage {
  stores : Store[] = [];
  favorites : any[] = [];
  isFavorite: boolean = false;

  constructor(public navCtrl: NavController, 
              public toastCtrl : ToastController,
              public storeService: StoreService, 
              public authDataService: AuthDataService,
              public favoriteService : FavoriteService,
              public menu : MenuController) {
    


    this.GetStores();
    this.GetFavorites();
    //this.IsStoreFavorited('KSllqHEGGKnR88Wh0Ed');

  }

  GetStores(){
    this.storeService.GetList().subscribe(
      store => {
        this.stores.push(store);
      },
      err => console.error(err)
    );
  }

  Search(event) {
   
  } 

  GetFavorites(){
    this.favorites =  this.favoriteService.GetFavorites().then((data) =>{
      console.log(data)
    });
  }


  IsStoreFavorited(storeId){
    this.favoriteService.IsFavorite(storeId).then((data) =>{
        console.log(data);
    });
  }

  FavoriteStore(storeId) {
    if (this.favoriteService.IsFavorite(storeId))
    { 
      this.favoriteService.SaveFavorite(storeId).then(() => {
          let toast = this.toastCtrl.create({
              message: 'Added to favorites',
              duration: 3000,
              position: 'top'
          });
          toast.present();
      });
    }
    else
    {
      this.favoriteService.RemoveFavorite(storeId).then(() => {
          let toast = this.toastCtrl.create({
              message: 'Added to favorites',
              duration: 3000,
              position: 'top'
          });
          toast.present();
      });
    }
  } 


  GoToStoreDetails(storeId)
  {
    //console.log(storeId);
    this.navCtrl.push(StoreDetailsPage, {
      storeId: storeId,
    });
  }

  GoToNewStore()
  {
    this.navCtrl.push(StoreCreatePage);
  }
}




