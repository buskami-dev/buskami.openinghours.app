import { StoreService } from './../../providers/store.service';
import { Store } from './../../models/store.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-store-details',
  templateUrl: 'store-details.html'
})
export class StoreDetailsPage {
store: Store;

  constructor(public navCtrl: NavController, public navParams: NavParams, public StoreService: StoreService) {
    this.GetStoreDetails();
  }

  GetStoreDetails(){
      this.store = this.StoreService.GetDetails(this.navParams.get('storeId'));
  }

}
