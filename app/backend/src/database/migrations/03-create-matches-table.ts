import { DataTypes, Model, QueryInterface } from "sequelize";
import { IMatches } from "../../Interfaces/matches/IMatches";

export default {
  up(queryInterface: QueryInterface){
    return queryInterface.createTable<Model<IMatches>>('matches',{
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      awayTeamGoals: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'in_progress',
      },
    })
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
}