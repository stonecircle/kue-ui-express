const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  time: Date,
});

module.exports = schema;
module.exports.modelName = 'Example';
