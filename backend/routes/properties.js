const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const taskController = require('../controllers/taskController');

// Property routes
router.get('/', propertyController.getProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', propertyController.createNewProperty);
router.put('/:id', propertyController.updateExistingProperty);
router.delete('/:id', propertyController.deleteExistingProperty);

// Nested Task Route: Get all tasks for a specific property
// e.g., GET /api/properties/123/tasks
router.get('/:propertyId/tasks', taskController.getTasksForProperty);

module.exports = router;
