const { Task } = require('../models');

const taskService = {
  // Returns an array of plain objects
  getByPropertyId: async (propertyId) => {
    return Task.findAll({ where: { propertyId }, raw: true });
  },

  // Returns a single plain object
  getById: async (taskId) => {
    const task = await Task.findByPk(taskId, { raw: true });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },

  create: async (taskData) => {
    return Task.create(taskData);
  },

  update: async (taskId, taskData) => {
    const [affectedRows] = await Task.update(taskData, { where: { id: taskId } });
    if (affectedRows === 0) {
      throw new Error('Task not found or data is unchanged');
    }
    return taskService.getById(taskId);
  },

  delete: async (taskId) => {
    const affectedRows = await Task.destroy({ where: { id: taskId } });
    if (affectedRows === 0) {
      throw new Error('Task not found');
    }
    return { message: 'Task deleted successfully' };
  },
};

module.exports = taskService;
