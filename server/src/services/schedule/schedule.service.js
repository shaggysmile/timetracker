// Initializes the `schedule` service on path `/schedules`
const createService = require('feathers-mongoose');
const createModel = require('../../models/schedule.model');
const hooks = require('./schedule.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'schedule',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/schedules', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('schedules');

  service.hooks(hooks);
};
