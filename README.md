# Kue-Ui-Express

## Introduction
Easy way to mount [Kue-Ui](https://github.com/stonecircle/kue-ui) for Express apps.

## Installation
```
$ npm install kue-ui-express
```

## Setup

### Mount with express and kue

```javascript
var kue = require('kue');
var express = require('express');
var kueUiExpress = require('kue-ui-express');
var app = express();

kue.createQueue();

kueUiExpress(app, '/kue', '/api');

// Mount kue JSON api
app.use('/api', kue.app);

app.listen(3000);
```

### Configuration

The example above mounts the Kue-Ui Ember appilcation on the express app at the locatio `/kue` and tells the application to point at `/api` to access the Kue JSON api.

You are also able to enable a simple [Authmaker](https://authmaker.com) based by passing your [Authmaker Ember Simple Auth](https://github.com/Authmaker/authmaker-ember-simple-auth) config as the final argument to the `kueUiExpress()` setup function as follows.

```
kueUiExpress(app, '/interface', 'https://otherdomain.com/kue-api', {
  domainUrl: "https://yoursuperapp.authmaker.com",
  redirectUri: "https://app.yoursuperapp.com/interface/login",
  clientId: "passDEADBEEFwordDEADBEEFkeyDEADBEEF"
});
```

The authmaker config is optional and Kue-Ui will work entirely without Authenticaion/Authorisation if you don't provide it.

## Development
This repo is just a wrapper for wrapping [Kue-Ui](https://github.com/stonecircle/kue-ui) in an express app. Most develpment will be done on the main Kue-Ui repo.

### License
`kue-ui-express` is released under the MIT license. See LICENSE.txt for the complete text.
