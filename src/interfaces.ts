export interface IBand {
  id: number;
  name: string; 
}

export interface IVenue {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
}

export interface IConcert {
  bandid: number;
  venueid: number;
  date: Date;
}