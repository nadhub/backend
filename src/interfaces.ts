import { IModels } from './models';

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
  bandId: number;
  venueId: number;
  date: Date;
}

export interface IContext {
  models: IModels;
}