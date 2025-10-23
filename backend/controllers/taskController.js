
const taskService = require('../services/taskService');

const taskController = {
  getTasksForProperty: async (req, res) => {
    try {
      const { propertyId } = req.params;
      const tasks = await taskService.getByPropertyId(propertyId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
  },

  createNewTask: async (req, res) => {
    try {
      if (!req.body.propertyId) {
        return res.status(400).json({ message: 'propertyId is required to create a task.' });
      }
      const newTaskInstance = await taskService.create(req.body);
      res.status(201).json(newTaskInstance.toJSON());
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error: error.message });
    }
  },

  updateExistingTask: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTask = await taskService.update(id, req.body);
      res.status(200).json(updatedTask);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error updating task', error: error.message });
    }
  },

  deleteExistingTask: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await taskService.delete(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
  },
};

module.exports = taskController;
