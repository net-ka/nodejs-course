const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const asyncErrorHandler = require('../../errorHandlers/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const tasks = await tasksService.getAllByBoard(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:taskId').get(
  asyncErrorHandler(async (req, res) => {
    const task = await tasksService.getById(req.params.taskId);
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const task = await tasksService.create(
      new Task({
        ...req.body,
        boardId: req.params.boardId
      })
    );

    res.json(Task.toResponse(task));
  })
);

router.route('/:taskId').delete(
  asyncErrorHandler(async (req, res) => {
    await tasksService.deleteById(req.params.taskId);
    res.status(204).send();
  })
);

router.route('/:taskId').put(
  asyncErrorHandler(async (req, res) => {
    const task = await tasksService.update(req.params.taskId, req.body);
    res.json(Task.toResponse(task));
  })
);

module.exports = router;
