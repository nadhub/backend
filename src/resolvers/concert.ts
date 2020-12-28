import { IConcert } from '../interfaces';

export default {
  Query: {
    concerts: async (_, __, ctx): Promise<IConcert[]> => {
      let concerts;
        try {
          concerts = await ctx.models.ConcertModel.findAll();
        } catch (e) {
          console.log(e);
        }
        return concerts;
    },
    concertsCount: async (_, __, ctx): Promise<number> => {
      const result = await ctx.models.ConcertModel.findAndCountAll();
      return result.count;
    },
    concertByBand: async(_, args, ctx): Promise<IConcert> => {
      const result = await ctx.models.ConcertModel.findAll({
        where: {
          bandid: args.bandid
        }
      })
      return result;
    },
    concertByVenue: async(_, args, ctx): Promise<IConcert> => {
      const result = await ctx.models.ConcertModel.findAll({
        where: {
          venueid: args.venueid,
        }
      });
      return result;
    },
  },
};