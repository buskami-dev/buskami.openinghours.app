export class Store { 
  isFavorite: boolean

  constructor(public id: string,
              public name:string, 
              public mapLink:string, 
              public phone:string, 
              public image:string,
              public description:string,
              public url:string,
              public openinghours:any[])
  {
    this.id = id;
    this.name = name; 
    this.mapLink = mapLink,
    this.phone = phone,
    this.image = image,
    this.description = description,
    this.url = url,
    this.isFavorite = false;
    this.openinghours = openinghours
  }

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
}