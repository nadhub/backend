import { Model, DataTypes, HasOneSetAssociationMixin, HasOneGetAssociationMixin } from 'sequelize';
import sequelize from '../../db';
import Band from '../bands';
import Venue from '../venues';

interface IConcertAttributes {
  bandid: number;
  venueid: number;
  date: Date;
}

// interface IConcertCreateAttributes extends Optional<IConcertAttributes, "id"> {}

class Concert extends Model<IConcertAttributes> implements IConcertAttributes {
  bandid!: number;
  venueid!: number;
  date!: Date;

  public getBand!: HasOneGetAssociationMixin<Band>;
  public hasBand!: HasOneSetAssociationMixin<Band, number>;
  public getVenue!: HasOneGetAssociationMixin<Venue>;
  public hasVenue!: HasOneSetAssociationMixin<Venue, number>;
  
}

Concert.init(
  {
    bandid: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    venueid: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: new DataTypes.DATE,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'concerts',
  }
);


export default Concert;