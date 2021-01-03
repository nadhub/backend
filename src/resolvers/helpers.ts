import { Op, fn, col } from 'sequelize';
import { IModels } from '../models';
import { IConcert, ISearchCriteria, IVenue } from '../interfaces';

export const isBandIdsValid = (args: ISearchCriteria): boolean => {
  if (args?.bandIds?.length ) {
    if (args.bandIds.length > 0) {
      return !args.bandIds?.find(id => typeof id !== 'number');
    }
  }
  return false;
};

export const isGeographyArgsValid = (args: ISearchCriteria): boolean => {
  const isLatitude = (args.latitude) ? typeof args.latitude !== 'number' ? false : true : false;
  const isLongitude = (args.longitude) ? typeof args.longitude !== 'number' ? false : true : false;
  const isRadius = (args.radius) ? typeof args.radius !== 'number' ? false : true : false;
  
  return isLatitude && isLongitude && isRadius; 
};

/**
 * 
 * @param args 
 * @param models 
 */
export const getConcertsByBands = async(args: ISearchCriteria, models: IModels): Promise<IConcert[]> => {
  const result = await models.concertModel.findAll({
    where: {
      bandId: {
        [Op.in]: args.bandIds,
      }
    }
  });
  return result;
};
/**
 * Get concerts with location (latitude/longitude) around
 * a radius
 * @param args 
 * @param models 
 */
export const getConcertsLocationWithInRadius = async(args: ISearchCriteria, models: IModels): Promise<IVenue[]> => {
  // prepare point as geography field to pass it as argument in ST_WITHIN function
  const GeomFromGeoJSON_Fn = fn('ST_GeomFromGeoJSON', `{ "type": "Point", "coordinates": [ ${args.longitude} , ${ args.latitude } ] }`);
  // convert radius in meters
  const km = 1000;
  const distance = args.radius ? +args.radius * km : 0;
  const ST_WITHIN_Fn = fn('ST_DWithin', col('location'), GeomFromGeoJSON_Fn, distance);
  // if bandIds are in arguments we filter location in concerts with the matched bandIds
  let concertVenueIdsByBandIds;
  if (args.bandIds) {
    const matchedBands = await models.concertModel.findAll({
    where: {
      bandId: {
        [Op.in]: args.bandIds,
      }
    },
    attributes: ['venueId'],
  });
   concertVenueIdsByBandIds = matchedBands.map(math => math.venueId);
  }
  
  const where = args.bandIds ? { 
                        [Op.and]: [
                          {
                            id: {
                            [Op.in]: concertVenueIdsByBandIds,
                          },
                        },
                        ST_WITHIN_Fn,
                        ]
                      } : ST_WITHIN_Fn; 
  const result = await models.venueModel.findAll({
    where,
    attributes: ['id'],
  });
  return result;
};