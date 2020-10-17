const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

const customLoggerData = (tokens, req, res) => {
  if (req.body.password) {
    req.body.password = '*******';
  }

  return [
    tokens.date(req, res),
    tokens.method(req, res),
    JSON.stringify(req.body),
    tokens.url(req, res),
    JSON.stringify(req.params),
    tokens.status(req, res),
    tokens['response-time'](req, res).concat(' ms')
  ].join(' | ');
};

const errorsLogStream = fs.createWriteStream(
  path.join(__dirname, 'errors.log'),
  { flags: 'a' }
);

const errorsLoggerData = (tokens, req, res) => {
  if (tokens.status(req, res) > 399) {
    return customLoggerData(tokens, req, res);
  }
};

const loggerConsole = morgan((tokens, req, res) =>
  customLoggerData(tokens, req, res)
);

const loggerFile = morgan(
  (tokens, req, res) => customLoggerData(tokens, req, res),
  {
    stream: accessLogStream
  }
);

const loggerErrorsFile = morgan(
  (tokens, req, res) => errorsLoggerData(tokens, req, res),
  {
    stream: errorsLogStream
  }
);

module.exports = {
  loggerConsole,
  loggerFile,
  loggerErrorsFile
};
