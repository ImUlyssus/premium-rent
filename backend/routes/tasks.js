const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes for individual tasks
router.post('/', taskController.createNewTask);
router.put('/:id', taskController.updateExistingTask);
router.delete('/:id', taskController.deleteExistingTask);

module.exports = router;
