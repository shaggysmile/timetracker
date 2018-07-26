// Initializes the `apps` service on path `/apps`
const createService = require('feathers-mongoose');
const createModel = require('../../models/application.model');
const hooks = require('./application.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'application',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/application', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('application');

  service.hooks(hooks);
};
