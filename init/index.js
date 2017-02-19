const mongoose = require('mongoose');
const mongooseConnect = require('mongoose-nconf-connect');
const Q = require('q');
const winston = require('winston');

const models = require('../models');

mongoose.Promise = Q.Promise;

let initialised = false;

module.exports = function initMongodb(nconf) {
  if (initialised) {
    return Q();
  }

  if (!nconf.get('database:mongo')) {
    throw new Error('NConf entry for database:mongo: requried to run this application');
  }

  return mongooseConnect.connectGlobalMongo(nconf, mongoose, {
    configPrefix: 'database:mongo:',
    logger: winston,
  })

  .then(() => models.init(mongoose))
  .then(() => {
    initialised = true;
  })
  .then(null, (err) => {
    winston.error('Error During Initialisation', {
      error: err.message,
      stack: err.stack,
    });
  });
};
