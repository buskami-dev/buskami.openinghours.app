export class Profile { 
  id:string;
  firstName:string;
  lastName: string;
  birthDate: string;
  gender: string;
  favorites:any[];
  constructor(){}

  AddFavorite(storeId) : void{
    this.favorites.push({storeId})
  }
}

