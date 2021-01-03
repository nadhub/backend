import { IModels } from './models';

export interface IBand {
  id: number;
  name: string; 
}

export interface IPoint {
  type: string;
  coordinates: number[];
}

export interface IVenue {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  location?: IPoint;
}

export interface IConcert {
  bandId: number;
  venueId: number;
  date: Date;
}

export interface IContext {
  models: IModels;
}

export interface ISearchCriteria {
  bandIds?: number[];
  latitude?: number;
  longitude?: number;
  radius?: number;
}