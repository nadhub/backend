import fs from 'fs';
import path from 'path';
import { IPoint, IVenue } from '../interfaces';
import models from '../models';


/**
 * Load inital data for test purpose
 * this should be done once
 */
const loadInialData = async () => {
  const bandsJson = fs.readFileSync(path.resolve(__dirname, '../../data/bands.json'));
  const venusJson = fs.readFileSync(path.resolve(__dirname, '../../data/venues.json'));
  const concertJson = fs.readFileSync(path.resolve(__dirname, '../../data/concerts.json'));

  const bandsCount = (await models.bandModel.findAndCountAll()).count;
  const venuesCount = (await models.venueModel.findAndCountAll()).count;
  const concertsCount = (await models.concertModel.findAndCountAll()).count;

  if (bandsCount === 0) {
    const bandsDataArray = JSON.parse(bandsJson.toString());
    await models.bandModel.bulkCreate(bandsDataArray);
    console.log('End inserting bands data!!');
  }
  if (venuesCount === 0) {
    const venuesDataArray = JSON.parse(venusJson.toString());
    for (const venue of venuesDataArray) {
      await insertVenue(venue);
    }
    console.log('End inserting venues data!!');
  }
  if (concertsCount === 0) {
    const concertsDataArray = JSON.parse(concertJson.toString());
    await models.concertModel.bulkCreate(concertsDataArray);
    console.log('End inserting concerts data!!');
  }
};

const insertVenue = async (venue: IVenue) => {
  
  const buildVenue = models.venueModel.build(venue);
  const point: IPoint = {  
    type: 'Point',
    coordinates: [ venue.longitude, venue.latitude ],
    };
  buildVenue.location=point;
  await buildVenue.save();
};

loadInialData();
