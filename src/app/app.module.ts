import { ArrayFilterPipe } from './../pages/shared/array-filter.pipe';
import { StoreService } from './../providers/store.service';
import { ProfileService } from './../providers/profile.service';
import { AuthDataService } from './../providers/authdata.service';
import { FavoriteService } from './../providers/favorite.service';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { FavoritesPage } from '../pages/favorites/favorites';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { StoreCreatePage } from '../pages/store-create/store-create';
import { StoreDetailsPage } from '../pages/store-details/store-details';
import { StoresPage } from '../pages/stores/stores';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule, AuthMethods, AuthProviders  } from 'angularfire2';


export const firebaseConfig = {
    apiKey: "AIzaSyAZwVbcX0hSBasAmfYG7qgcfV7mD-EJRyI",
    authDomain: "buskami-openinghours.firebaseapp.com",
    databaseURL: "https://buskami-openinghours.firebaseio.com",
    storageBucket: "buskami-openinghours.appspot.com",
    messagingSenderId: "663873067982"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    FavoritesPage,
    HomePage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    StoreCreatePage,
    StoreDetailsPage,
    StoresPage,
    TabsPage,
    ArrayFilterPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    FavoritesPage,
    HomePage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
    StoreCreatePage,
    StoreDetailsPage,
    StoresPage,
    TabsPage,
  ],
    providers: [
    AuthDataService,
    ProfileService,
    StoreService,
    FavoriteService
  ]
})
export class AppModule {}
