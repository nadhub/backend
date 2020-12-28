import { IBand, IConcert, IVenue } from '../interfaces';
import { IContext } from '../interfaces';

export default {
  Query: {
    concerts: async (_, { offset, limit } : { offset: number, limit: number }, { models }: IContext): Promise<IConcert[]> => {
      let concerts;
        try {
          concerts = await models.concertModel.findAll({
            offset,
            limit,
          });
        } catch (e) {
          console.log(e);
        }
        return concerts;
    },
    concertsCount: async (_, _args, { models }: IContext): Promise<number> => {
      const result = await models.concertModel.findAndCountAll();
      return result.count;
    },
    concertByBand: async(_, { bandId }: { bandId: number }, { models }: IContext): Promise<IConcert[]> => {
      const result = await models.concertModel.findAll({
        where: {
          bandId,
        }
      });
      return result;
    },
    concertByVenue: async(_, { venueId } : { venueId: number }, { models }: IContext): Promise<IConcert[]> => {
      const result = await models.concertModel.findAll({
        where: {
          venueId,
        }
      });
      return result;
    },
  },
  Concert: {
    band: async (parent: IConcert, _args, { models }: IContext): Promise<IBand | null> => {
      const band = await  models.bandModel.findByPk(parent.bandId);
      return band;
    },
    venue: async (parent: IConcert, _args, { models }: IContext): Promise<IVenue | null> => {
      const venue = await  models.venueModel.findByPk(parent.bandId);
      return venue;
    }
  }
};