class AppError extends Error {
  constructor(status, message) {
    super(message);

    this.status = status;
  }
}

const handleAppError = (err, req, res, next) => {
  if (err instanceof AppError) {
    const { status, message } = err;

    res.status(status).json({
      status,
      message
    });
  } else {
    res.status(500).send('Internal server error');
  }

  next();
};

module.exports = {
  AppError,
  handleAppError
};
