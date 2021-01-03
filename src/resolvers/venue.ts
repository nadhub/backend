import { IVenue, IContext, IPoint } from '../interfaces';
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
  Mutation: {
    /**
     * @param _ create a venue entry
     * location fiels is a geography point.
     * We'de add index postgis for this field
     * @param param1
     * @param param2
     */
    addVenue: async(_, {id, name, latitude, longitude }: IVenue, { models }: IContext): Promise<IVenue> => {
      const venue = models.venueModel.build({
        id,
        name,
        latitude,
        longitude
      });
      const point: IPoint = { type: 'Point',
      coordinates: [ venue.longitude, venue.latitude ],
      };
      venue.location = point;
      await venue.save();
      return venue;
    },
  }
};