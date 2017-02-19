const cors = require('cors');
const express = require('express');
const winston = require('winston');
const nconf = require('nconf');

const settings = require('./settings');
const appRoutes = require('./server');

// remove it so to add it with my settings
winston.remove(winston.transports.Console);

const winstonOptions = {
  colorize: true,
  timestamp: true,
  handleExceptions: true,
  prettyPrint: true,
};

if (process.env.LOG_LEVEL) {
  winstonOptions.level = process.env.LOG_LEVEL;
} else if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  winstonOptions.level = 'debug';
} else {
  winstonOptions.level = 'info';
}

winston.add(winston.transports.Console, winstonOptions);

const app = express();
if (settings.server.useCors) {
  app.use(cors());
}

// Initialisations
require('./init')(nconf).then(() => {
  appRoutes(app);

  const server = app.listen(settings.server.runPort, () => {
    winston.info('Server listening', {
      host: server.address().address,
      port: server.address().port,
    });
  });
});
