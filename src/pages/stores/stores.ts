import { AuthDataService } from './../../providers/authdata.service';
import { StoreService } from './../../providers/store.service';
import { StoreDetailsPage } from './../store-details/store-details';
import { StoreCreatePage } from './../store-create/store-create';
import { Component } from '@angular/core';
import { NavController , MenuController} from 'ionic-angular';
import { Store } from '../../models/store.model';

@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html'
})
export class StoresPage {
  stores : Store[] = [];
  isChecked : boolean = false;

  constructor(public navCtrl: NavController, 
              public storeService: StoreService, 
              public authDataService: AuthDataService,
              public menu : MenuController) {
    //this.menu.enable(true);
    this.GetStores();
  }


  GetStores(){
    this.storeService.GetList().subscribe(
      store => {
        //console.log(store);
        this.stores.push(store);
      },
      err => console.error(err)
    );
  }

  Search(event) {
   
  } 


  Favorite(store) {
    console.log(store.id);
    this.isChecked = !this.isChecked;
  } 


  GoToDetails(storeId)
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
}




