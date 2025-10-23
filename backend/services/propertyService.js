const { Property } = require('../models');

const propertyService = {
  // Returns an array of plain objects
  getAll: async (filters = {}) => {
    return Property.findAll({ where: filters, raw: true });
  },

  // Returns a single plain object
  getById: async (propertyId) => {
    const property = await Property.findByPk(propertyId, { raw: true });
    if (!property) {
      throw new Error('Property not found');
    }
    return property;
  },

  // The 'create' method returns a model instance, which is what we want here.
  // We will handle converting it in the controller just this once.
  create: async (propertyData) => {
    return Property.create(propertyData);
  },

  // The 'update' method in Sequelize returns metadata, not the object.
  // So, we update, and then we fetch the updated plain object.
  update: async (propertyId, propertyData) => {
    const [affectedRows] = await Property.update(propertyData, { where: { id: propertyId } });
    if (affectedRows === 0) {
      throw new Error('Property not found or data is unchanged');
    }
    // Return the updated, clean object
    return propertyService.getById(propertyId);
  },

  // The 'destroy' method returns the number of rows deleted.
  delete: async (propertyId) => {
    const affectedRows = await Property.destroy({ where: { id: propertyId } });
    if (affectedRows === 0) {
      throw new Error('Property not found');
    }
    return { message: 'Property deleted' };
  },
};

module.exports = propertyService;
