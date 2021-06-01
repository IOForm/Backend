'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role)
      User.belongsToMany(models.Form, { through: models.Approval })
      User.hasMany(models.Approval)
    }
  };
  User.init({
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    RoleId: {
      type: DataTypes.INTEGER, 
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};