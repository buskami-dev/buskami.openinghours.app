export interface IStore {
  id:string;
  name: string;
  mapLink: string;
  phone: string;
  image: string;
  description: string;
  url: string;
  openinghours: string[]
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

