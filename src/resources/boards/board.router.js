const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const asyncErrorHandler = require('../../errorHandlers/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const board = await boardsService.getById(req.params.id);

    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const board = await boardsService.create(
      new Board({
        title: req.body.title,
        columns: req.body.columns
      })
    );
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.deleteById(req.params.id);

    res.status(204).send();
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

module.exports = router;
