const telegram = require('./telegram/telegram.service.js');
const application = require('./application/application.service.js');
const location = require('./location/location.service.js');
const employee = require('./employee/employee.service.js');
const position = require('./position/position.service.js');
const schedule = require('./schedule/schedule.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(telegram);
  app.configure(application);
  app.configure(location);
  app.configure(employee);
  app.configure(position);
  app.configure(schedule);
};
