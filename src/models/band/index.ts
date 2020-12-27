import { Model, DataTypes, HasManyGetAssociationsMixin, Association } from 'sequelize';
import sequelize from '../../db';
import Venue from '../venues';
import Concert from '../concerts';

interface IBandAttributes {
  id: number;
  name: string;
}


class Band extends Model<IBandAttributes> implements IBandAttributes {
  public id!: number;
  public name!: string;

  public getConcerts!: HasManyGetAssociationsMixin<Concert>;
  public static readonly concerts?: Concert[];

  public static associations: {
    concerts: Association<Band, Concert>;
  }
}

Band.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'bands',
  }
);

Band.hasMany(Concert, {
  sourceKey: 'id',
  foreignKey: 'bandid',
  as: 'concerts',
  onDelete: 'CASCADE',
});

export default Venue;