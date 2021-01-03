import { Model, DataTypes } from 'sequelize';
import { IConcert } from '../../interfaces';
import sequelize from '../../db';

class Concert extends Model<IConcert> implements IConcert {
  bandId!: number;
  venueId!: number;
  date!: Date;
  
}

Concert.init(
  {
    bandId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    venueId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: new DataTypes.DATE,
      primaryKey: true,
      allowNull: false,
      get () {
        const dateValue = this.getDataValue('date');
        return new Date(dateValue).getTime();
      }
    },
  },
  {
    sequelize,
    tableName: 'concerts',
  }
);


export default Concert;