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
      // Approval.belongsTo(models.Form)
    }
  };
  Approval.init({
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    FormId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Forms',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    approvalStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Approval',
  });
  return Approval;
};