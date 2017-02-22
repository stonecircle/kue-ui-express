const path = require('path');
const serveStatic = require('serve-static');
const jsdom = require('jsdom').jsdom;
const fs = require('fs');

const indexFile = fs.readFileSync(
  path.join(__dirname, '../node_modules/kue-ui-client/dist/index.html'),
  'utf8'
);

function mountKueUi(app, route, apiURL, authmakerConfig) {
  if (!route.endsWith('/')) {
    throw new Error('You must end your route with /');
  }

  app.use(serveStatic(path.join(__dirname, '../node_modules/kue-ui-client/dist'), {
    index: false,
  }));

  app.get(`${route}*`, (req, res) => {
    const document = jsdom(indexFile);
    const window = document.defaultView;

    const scriptEl = window.document.createElement('script');
    scriptEl.text =
`window.__kueUiExpress = {
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
