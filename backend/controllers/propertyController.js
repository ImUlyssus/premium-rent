
const propertyService = require('../services/propertyService');

const propertyController = {
  getProperties: async (req, res) => {
    try {
      const filters = req.query.status ? { status: req.query.status } : {};
      const properties = await propertyService.getAll(filters);
      res.status(200).json(properties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching properties', error: error.message });
    }
  },

  createNewProperty: async (req, res) => {
    try {
      const newPropertyInstance = await propertyService.create(req.body);
      res.status(201).json(newPropertyInstance.toJSON());
    } catch (error) {
      res.status(500).json({ message: 'Error creating property', error: error.message });
    }
  },

  updateExistingProperty: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProperty = await propertyService.update(id, req.body);
      res.status(200).json(updatedProperty); // Already a plain object
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error updating property', error: error.message });
    }
  },

  deleteExistingProperty: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await propertyService.delete(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error deleting property', error: error.message });
    }
  },

  getPropertyById: async (req, res) => {
    try {
      const { id } = req.params;
      const property = await propertyService.getById(id);
      res.status(200).json(property);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error fetching property', error: error.message });
    }
  },
};

module.exports = propertyController;
