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
    clientName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `client name cannot be empty`
        }
      }
    },
    formDetail: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: `form detail cannot be empty`
        }
      }
    },
    fileAttachment: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: `file attachment cannot be empty`
        }
      }
    },
    formComplete: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};