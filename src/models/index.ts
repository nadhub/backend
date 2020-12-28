import bandModel from './band';
import venueModel from './venue';
import concertModel from './concert';

export interface IModels {
  bandModel: typeof bandModel;
  venueModel: typeof venueModel;
  concertModel: typeof concertModel;
}

const models: IModels = {
  bandModel,
  venueModel,
  concertModel,
};

export default models;