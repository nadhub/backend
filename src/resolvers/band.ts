import { IBand, IContext } from '../interfaces';

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
  }
};