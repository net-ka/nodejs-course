const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const asyncErrorHandler = require('../../errorHandlers/asyncErrorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    res.json(User.toResponse(user));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.create(new User({ ...req.body }));

    res.json(User.toResponse(user));
  })
);

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.deleteById(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.json(User.toResponse(user));
  })
);

module.exports = router;
