const mongoose = require('mongoose');

module.exports = function (app) {
  mongoose.connect(app.get('mongodb').uri, {
    user: app.get('mongodb').user,
    pass: app.get('mongodb').password
  });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
