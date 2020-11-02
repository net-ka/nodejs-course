const router = require('express').Router();
const authService = require('./auth.service');
const asyncErrorHandler = require('../../errorHandlers/asyncErrorHandler');

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const { login, password } = req.body;

    const token = await authService.loginToken({ login, password });

    res.status(200).json({ token });
  })
);

module.exports = router;
