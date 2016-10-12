export interface IStore {
  id: string;
  name: string;
  address: string;  
  mapLink: string;
  phone: string;
  image: string;
  description: string;
  url: string;
  openinghours?: any[]
}

export interface ICredentials {
 email: string;
 password: string;
}

export interface IProfile {
  firstName:string;
  lastName: string;
  birthDate: string;
  gender: string;
}

