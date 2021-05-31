'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Approval extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Approval.belongsTo(models.User)
      Approval.belongsTo(models.Form)
    }
  };
  Approval.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: DataTypes.INTEGER,
    FormId: DataTypes.INTEGER,
    approvalStatus:DataTypes.BOOLEAN,
    rejected:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Approval',
  });
  return Approval;
};