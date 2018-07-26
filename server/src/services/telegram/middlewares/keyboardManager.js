const Markup = require('telegraf/markup');

module.exports = (ctx, next) => {
  const __originalReply = ctx.reply;
  let currentKeyboard = [];
  const authAppKeyboard = [
    ctx.i18n.t('navigation.auth.app'),
    ctx.i18n.t('navigation.help'),
  ];
  const authEmployeeKeyboard = [
    ctx.i18n.t('navigation.auth.employee'),
    ctx.i18n.t('navigation.help')
  ];
  const employeeOpenKeyboard = [
    ctx.i18n.t('navigation.employee.open'),
    ctx.i18n.t('navigation.help'),
  ];
  const employeeCloseKeyboard = [
    ctx.i18n.t('navigation.employee.close'),
    ctx.i18n.t('navigation.help')
  ];
  ctx.reply = (...args) => {
    if (!ctx.session.isAppAuthenticated()) {
      currentKeyboard = authAppKeyboard;
    }
    if (ctx.session.isAppAuthenticated() && !ctx.session.isEmployeeAuthenticated()) {
      currentKeyboard = authEmployeeKeyboard;
    }
    if (ctx.session.isAppAuthenticated() && ctx.session.isEmployeeAuthenticated()) {
      currentKeyboard = employeeOpenKeyboard;
    }
    if(ctx.session.hasOpenSchedule()) {
      currentKeyboard = employeeCloseKeyboard;
    }
    if (args.length === 1) {
      args.push(Markup
        .keyboard(currentKeyboard)
        .resize()
        .extra()
      );
    }
    __originalReply.call(this, ...args);
  };
  return next();
};
