const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { handleAppError } = require('./errorHandlers/appError');

const {
  loggerConsole,
  loggerFile,
  loggerErrorsFile,
  loggerUnexpectedErrors
} = require('./logger/logger');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(loggerConsole);
app.use(loggerFile);
app.use(loggerErrorsFile);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(handleAppError);

process
  .on('unhandledRejection', (reason, promise) => {
    loggerUnexpectedErrors(
      '[PROCESS] Unhandled Promise Rejection',
      `Unhandled Rejection at: ${promise}\n` + `Reason: ${reason}`
    );
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  })
  .on('uncaughtException', (err, origin) => {
    loggerUnexpectedErrors(
      '[PROCESS] Uncaught Exception',
      `Caught exception: ${err}\n` + `Exception origin: ${origin}`
    );
    throw new Error();
  });

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));

module.exports = app;
