import { Op } from 'sequelize';
import { IBand, IConcert, IVenue } from '../interfaces';
import { IContext, ISearchCriteria } from '../interfaces';
import { getConcertsByBands,
         getConcertsLocationWithInRadius,
         isBandIdsValid,
         isGeographyArgsValid
        } from './helpers';

export default {
  Query: {
    /**
     * @param _ serach concerts with with given search criteria
     * @param args
     * @param param2
     */
    concertsByBandAndLocationWithInRadius: async (_: any, args: ISearchCriteria, { models }: IContext): Promise<IConcert[] | undefined> => {
      let result;
      const isBandIdsCriteria = isBandIdsValid(args);
      const isGeographyArgsCriteria = isGeographyArgsValid(args);

      if (!isBandIdsCriteria && !isGeographyArgsCriteria) {
        throw new Error('You must at least provide bandIds OR latitude/longitude/radius');
      }
      // if only bandIds arguments provided
      if (isBandIdsCriteria && !isGeographyArgsCriteria) {
        result = await getConcertsByBands(args, models);
      }
      // if only latitude, longitude and radius are provided
      // or also bandIds is in parameters
      if ((isBandIdsCriteria || !isBandIdsCriteria) && isGeographyArgsCriteria) {
        // Get venues within radius by bandIds or not (if no bandIds in parameters)
        const listVenuesInRadius = await getConcertsLocationWithInRadius(args, models);
        const listVenuesIds = listVenuesInRadius.map(res =>res.id);
        // if bandIds parameters exist we filter concerts query by bandIds
        const where = args.bandIds ? {
            venueId: {
              [Op.in]: listVenuesIds,
            },
            bandId : {
              [Op.in]: args.bandIds,
            },
          }: {
            venueId: {
              [Op.in]: listVenuesIds,
            },
          };
        // Query concerts  
        result = await models.concertModel.findAll({
          where,
        });
      }
      return result;
    }
  },
  Concert: {
    band: async (parent: IConcert, _args: any, { models }: IContext): Promise<IBand | null> => {
      const band = await  models.bandModel.findByPk(parent.bandId);  
      return band;
    },
    venue: async (parent: IConcert, _args: any, { models }: IContext): Promise<IVenue | null> => {
      const venue = await  models.venueModel.findOne({
        where: {
          id: parent.venueId,
        },
      });
      return venue;
    },
  }
};