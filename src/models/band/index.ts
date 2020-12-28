import { Model, DataTypes, HasManyGetAssociationsMixin, Association } from 'sequelize';
import { IBand } from '../../interfaces';
import sequelize from '../../db';
import Concert from '../concert';

class Band extends Model<IBand> implements IBand {
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
  foreignKey: 'bandId',
  as: 'concerts',
  onDelete: 'CASCADE',
});

export default Band;