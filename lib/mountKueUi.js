const serveStatic = require('serve-static');
const { JSDOM } = require('jsdom');
//const kueUiClient = require('kue-ui-client');
const kueUiClient = require('./../../kue-ui');

const indexFile = kueUiClient.getIndexFile();

function mountKueUi(app, route, apiURL, authmakerConfig) {
  if (!route.endsWith('/')) {
    throw new Error('You must end your route with /');
  }

  app.use(serveStatic(kueUiClient.getDistPath(), {
    index: false,
  }));

  app.get(`${route}*`, (req, res) => {
    const { window } = new JSDOM(indexFile);

    const scriptEl = window.document.createElement('script');
    scriptEl.text = `window.__kueUiExpress = {
  rootUrl: "${route}",
  apiURL: "${apiURL || '/kue-api'}"
};`;

    if (authmakerConfig) {
      scriptEl.text += `window.__kueUiExpress.authmaker = ${JSON.stringify(authmakerConfig)}`;
    }

    window.document.body.appendChild(scriptEl);

    res.send(window.document.documentElement.outerHTML);
  });
}

module.exports = mountKueUi;
