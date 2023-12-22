const express = require('express');
const {show} = require('../debug/debug.js');
const task =  require('../controller/task.controller.js');

const router = express.Router();

router
    .route('/')
    .get(task.getAllTask)
    .post(task.createTask)
    .put(task.updateTask);

router
    .route('/:id')
    .get(task.getTaskById)
    .delete(task.deleteTaskById);

module.exports = router;