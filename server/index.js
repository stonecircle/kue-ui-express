const autoroute = require('express-autoroute');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const morgan = require('morgan');
const nconf = require('nconf');
const path = require('path');
const winston = require('winston');

module.exports = function initialiseServer(app) {
  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.use(expressSession({
    secret: nconf.get('server:session_secret'),
    resave: false,
    saveUninitialized: true,
  }));

  autoroute(app, {
    routesDir: path.join(__dirname, '/routes'),
    logger: winston,
  });
};
