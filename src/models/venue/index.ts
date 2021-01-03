import { Model, DataTypes, HasManyGetAssociationsMixin, Association } from 'sequelize';
import { IPoint, IVenue } from '../../interfaces';
import sequelize from '../../db';
import Concert from '../concert';


class Venue extends Model<IVenue> implements IVenue {
  id!: number;
  name!: string;
  latitude!: number;
  longitude!: number;

  public getConcerts!: HasManyGetAssociationsMixin<Concert>;
  public readonly concerts?: Concert[];

  public static associations: {
    concerts: Association<Venue, Concert>;
  }

  set location(point: IPoint){
    if (!point) throw new Error('Point parameter is required');
    this.location = point;
  }
  
}

Venue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'venues',
  }
);


export default Venue;