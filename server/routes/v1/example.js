const autorouteJson = require('express-autoroute-json');
const models = require('../../../models').models;

module.exports.autoroute = autorouteJson({
  model: models.example,
  resource: 'example', // this will be pluralised in the routes

  // default CRUD
  find: {},
  create: {},
  update: {},
  delete: {},
});
