import { IBand, IConcert, IContext } from '../interfaces';

export default {
  Query: {
    bands: async (_, __, { models }: IContext): Promise<IBand[]> => {
      let bands;
        try {
          bands = await models.bandModel.findAll();
        } catch (e) {
          console.log(e);
        }
        return bands;
    }
  },
  Band: {
    concerts: async ({ id }: IBand, _, { models }: IContext): Promise<IConcert[]> => {
      const concerts = await models.concertModel.findAll({
        where: {
          bandId: id,
        }
      });
      return concerts;
    }
  }
};