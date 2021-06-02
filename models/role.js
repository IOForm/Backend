'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User)
    }
  };
  Role.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `name cannot be empty`
        }
      }
    },
    position: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `position cannot be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};