'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Form.belongsToMany(models.User, { through: models.Approval })
      Form.hasMany(models.Approval )
    }
  };
  Form.init({
    clientName: DataTypes.STRING,
    formDetail: DataTypes.TEXT,
    fileAttachment: DataTypes.TEXT,
    formComplete: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};