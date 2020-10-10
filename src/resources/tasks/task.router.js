const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const tasks = await tasksService.getAllByBoard(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const task = await tasksService.getById(req.params.taskId);
    res.json(Task.toResponse(task));
    // res.json(task);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({
      ...req.body,
      boardId: req.params.boardId
    })
  );

  res.json(Task.toResponse(task));
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    await tasksService.deleteById(req.params.taskId);
    res.status(204).send();
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const task = await tasksService.update(req.params.taskId, req.body);
    res.json(Task.toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
