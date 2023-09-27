import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '.';

export default class SequelizeTeams extends Model<
InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>
> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    sequelize,
    modelName: 'teams',
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);
