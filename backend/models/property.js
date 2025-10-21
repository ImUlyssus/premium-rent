'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    static associate(models) {
      Property.hasMany(models.Task, {
        foreignKey: 'propertyId',
        as: 'tasks',
      });
    }
  }
  Property.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    ownerName: DataTypes.STRING,
    monthlyRent: DataTypes.DECIMAL,
    status: {
      type: DataTypes.ENUM,
      values: ['occupied', 'vacant', 'maintenance'],
      defaultValue: 'vacant',
    }

  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};