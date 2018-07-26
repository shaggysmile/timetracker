// Initializes the `employee` service on path `/employees`
const createService = require('feathers-mongoose');
const createModel = require('../../models/employee.model');
const hooks = require('./employee.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'employee',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/employees', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('employees');

  service.hooks(hooks);
};
