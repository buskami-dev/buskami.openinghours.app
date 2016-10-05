import { AuthDataService } from './../../providers/authdata.service';
import { StoreService } from './../../providers/store.service';
import { StoreDetailsPage } from './../store-details/store-details';
import { StoreCreatePage } from './../store-create/store-create';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '../../models/store.model';

@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html'
})
export class StoresPage {
  stores : Store[] = [];

  constructor(public navCtrl: NavController, public StoreService: StoreService, public authDataService: AuthDataService) {
    this.GetStores();
  }


  GetStores(){
    this.StoreService.GetList().subscribe(
      store => {
        //console.log(store);
        this.stores.push(store);
      },
      err => console.error(err)
    );
  }

  Search(event) {
   
  } 

  GoToStoreDetails(storeId)
  {
    console.log(storeId);
    this.navCtrl.push(StoreDetailsPage, {
      storeId: storeId,
    });
  }

  GoToNewStore()
  {
    this.navCtrl.push(StoreCreatePage);
  }

  LogOut(){
    this.authDataService.LogoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
}




