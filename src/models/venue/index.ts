import { Model, DataTypes, HasManyGetAssociationsMixin, Association } from 'sequelize';
import { IVenue } from '../../interfaces';
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
}

Venue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: new DataTypes.NUMBER,
      allowNull: false,
    },
    longitude: {
      type: new DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'venues',
  }
);

Venue.hasMany(Concert, {
  sourceKey: 'id',
  foreignKey: 'venueid',
  as: 'concerts',
  onDelete: 'CASCADE',
});

export default Venue;