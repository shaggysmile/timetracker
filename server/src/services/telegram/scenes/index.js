const authApp = require('./authApp');
const authEmployee = require('./authEmployee');
const cashShiftOpen = require('./cashShiftOpen');
const cashShiftClose = require('./cashShiftClose');
const cashShiftChoosePosition = require('./cashShiftChoosePosition');
const cashShiftChooseLocation = require('./cashShiftChooseLocation');
const cashShiftConfirmLocation = require('./cashShiftConfirmLocation');
const cashShiftToggle = require('./cashShiftToggle');

module.exports = {
  authApp,
  authEmployee,
  cashShiftOpen,
  cashShiftClose,
  cashShiftChoosePosition,
  cashShiftChooseLocation,
  cashShiftConfirmLocation,
  cashShiftToggle
};
