const Telegraf = require('telegraf');
const path = require('path');
const I18n = require('telegraf-i18n');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const {
  auth:authMiddleware,
  keyboardManager:keyboardManagerMiddleware
} = require('./middlewares/');

const {
  authApp,
  authEmployee,
  cashShiftOpen,
  cashShiftClose,
  cashShiftChoosePosition,
  cashShiftChooseLocation,
  cashShiftConfirmLocation,
  cashShiftToggle
} = require('./scenes/');

const { match } = require('telegraf-i18n');
const DEFAULT_LANG = 'ru';

module.exports = function (app) {
  const token = app.get('telegram').token;
  const bot = new Telegraf(token);
  const i18n = new I18n({
    directory: path.resolve(__dirname, 'locales'),
    defaultLanguage: DEFAULT_LANG,
    sessionName: 'session'
  });

  // Setup Feather Application
  bot.context.app = app;

  bot.use(session());
  bot.use(i18n.middleware());
  bot.use(authMiddleware);
  bot.use(keyboardManagerMiddleware);

  // Create scene manager
  const stage = new Stage();

  stage.register(authApp);
  stage.register(authEmployee);
  stage.register(cashShiftOpen);
  stage.register(cashShiftClose);
  stage.register(cashShiftChooseLocation);
  stage.register(cashShiftConfirmLocation);
  stage.register(cashShiftChoosePosition);
  stage.register(cashShiftToggle);

  stage.command('start', async (ctx) => {
    await ctx.reply(ctx.i18n.t('start'));
  });

  stage.hears(match('navigation.help'), async ({ reply, scene }) => {
    await reply('Это раздел помощи.');
    await scene.leave();
  });

  stage.hears(match('navigation.back'), async ({ reply, scene }) => {
    await reply('Окей.');
    await scene.leave();
  });

  stage.hears(match('navigation.auth.app'), async (ctx)=>{
    await ctx.scene.enter('AuthApp');
  });

  stage.hears(match('navigation.auth.employee'), async (ctx)=>{
    await ctx.scene.enter('AuthEmployee');
  });

  stage.hears(match('navigation.employee.open'), async (ctx)=>{
    await ctx.scene.enter('CashShiftOpen');
  });

  stage.hears(match('navigation.employee.close'), async (ctx)=>{
    await ctx.scene.enter('CashShiftClose');
  });

  bot.use(stage.middleware());
  bot.startPolling();

};
