import { IVenue, IConcert, IContext } from '../interfaces';
export default {
  Query: {
    venues: async (_, __, { models }: IContext): Promise<IVenue[]> => {
      let venues;
        try {
          venues = await models.venueModel.findAll();
        } catch (e) {
          console.log(e);
        }
        return venues;
    }
  },
  Venue: {
    concerts: async ({ id }: IVenue, _, { models }: IContext): Promise<IConcert[]> => {
      const concerts = await models.concertModel.findAll({
        where: {
          venueId: id,
        }
      });
      return concerts;
    }
  }
};