import { Model, DataTypes } from 'sequelize';
import { IBand } from '../../interfaces';
import sequelize from '../../db';

class Band extends Model<IBand> implements IBand {
  public id!: number;
  public name!: string;

}

Band.init(
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
  },
  {
    sequelize,
    tableName: 'bands',
  }
);

export default Band;