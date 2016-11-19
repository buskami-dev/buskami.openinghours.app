import { StoreService } from './../../providers/store.service';
import { Store } from './../../models/store.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-store-details',
  templateUrl: 'store-details.html'
})
export class StoreDetailsPage {
store: Store = {id:"", address:"", mapLink: "", image:"", description:"",  name:"", phone:"", url:""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public StoreService: StoreService) {
    this.GetStoreDetails(this.navParams.get('storeId'));
  }

    ionViewDidLoad() {
   // console.log('ionviewdidload');
    //this.GetStoreDetails();
  }

  GetStoreDetails(storeId){
      this.StoreService.GetDetails(storeId).on('value', (data) => {
      this.store.id = data.key;
      this.store.name = data.val().name;
      this.store.phone = data.val().phone;
      this.store.url = data.val().url;
    });
  }

}
