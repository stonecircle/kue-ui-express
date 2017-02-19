const fs = require('fs');
const path = require('path');

const models = [];

function init(mongoose) {
  fs.readdirSync(path.join(__dirname, '..', 'models'))
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach(file => {
      const requireFilename = file.replace('.js', '');

      // eslint-disable-next-line global-require
      const model = require(path.join('..', 'models', requireFilename));
      if (model.discriminator) {
        models[requireFilename] = model.discriminator.discriminator(model.modelName, model);
      } else {
        models[requireFilename] = mongoose.model(model.modelName, model);
      }
    });
}

module.exports = {
  models,
  init,
};
