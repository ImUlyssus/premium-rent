'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Property, {
        foreignKey: 'propertyId',
        as: 'property',
      });
    }
  }
  Task.init(
    {
      description: DataTypes.TEXT,
      type: {
        type: DataTypes.ENUM('cleaning', 'maintenance', 'inspection'),
        allowNull: false,
      },
      assignedPerson: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('pending', 'in progress', 'done'),
        allowNull: false,
        defaultValue: 'pending',
      },
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
