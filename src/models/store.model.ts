export class Store { 
  id: string;
  name:string;
  address:string;
  mapLink:string; 
  phone:string;
  image:string;
  description:string;
  url:string;
  openinghours?:any[];
  isFavorite?: boolean;
  
  constructor(id: string,
              name:string, 
              address:string,
              mapLink:string, 
              phone:string, 
              image:string,
              description:string,
              url:string)
  {
    this.id = id;
    this.name = name; 
    this.mapLink = mapLink,
    this.phone = phone,
    this.image = image,
    this.description = description,
    this.url = url
  }

/*
  addOpeningHours(days : number[], openTime: string, closeTime:string, startBreak: string, endBreak:string): void 
  {
    this.openinghours.push({
    daysOfTheWeek: days,
    openTime: openTime,
    closeTime: closeTime,
    breaks: [{
      start: startBreak,
      end : endBreak        
      }]
    });
  }
  */
}