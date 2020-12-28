import { IVenue, IConcert } from '../interfaces';
export default {
  Query: {
    venues: async (_, __, ctx): Promise<IVenue[]> => {
      let venues;
        try {
          venues = await ctx.models.VenueModel.findAll();
        } catch (e) {
          console.log(e);
        }
        return venues;
    }
  },
  Venue: {
    concerts: async (parent: IVenue, _, ctx): Promise<IConcert[]> => {
      const concerts = await ctx.models.ConcertModel.findAll({
        where: {
          venueid: parent.id,
        }
      });
      return concerts;
    }
  }
};