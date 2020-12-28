import { IBand, IConcert } from '../interfaces';

export default {
  Query: {
    venues: async (_, __, ctx): Promise<IBand[]> => {
      let bands;
        try {
          bands = await ctx.models.BandModel.findAll();
        } catch (e) {
          console.log(e);
        }
        return bands;
    }
  },
  Band: {
    concerts: async (parent: IBand, _, ctx): Promise<IConcert[]> => {
      const concerts = await ctx.models.ConcertModel.findAll({
        where: {
          bandid: parent.id,
        }
      });
      return concerts;
    }
  }
};