const moment = require('moment-timezone');
const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'CashShiftToggle';
const DEFAULT_TIMEZONE = 'Etc/Greenwich';
const DEFAULT_̈LANG = 'ru';

class CashShiftToggleScene extends SceneHandler {
  init(ctx) {
    super.init(ctx);
    moment.locale(ctx.session.application.lang || DEFAULT_̈LANG);
  }
  async runEnterReply() {
    const {_id, startDate, endDate} = this.ctx.session.schedule;
    if(!startDate && !endDate) {
      await this.openSchedule(this.ctx);
    } else if(_id && startDate && !endDate) {
      await this.closeSchedule(this.ctx);
    }
  }
  async openSchedule(ctx) {
    try {
      const schedule = await ctx.app.service('schedules').create({
        application: ctx.session.application._id,
        employee: ctx.session.employee._id,
        startDate: new Date(),
        endDate: null,
        location: ctx.session.schedule.location._id,
        position: ctx.session.schedule.position._id
      });
      if (schedule) {
        ctx.session.schedule = schedule;
        await ctx.reply(ctx.i18n.t(`${this.sceneName}.open.success`, {
          startDate: this.formatDate(schedule.startDate)
        }));
      } else {
        await ctx.reply(ctx.i18n.t(`${this.sceneName}.open.error`));
      }
    } catch (err) {
      await this.ctx.reply(ctx.i18n.t(`${this.sceneName}.error`));
    }
  }

  getTotalWorkedHours(start, end) {
    const a = moment(start);
    const b = moment(end);
    return (b.diff(a, 'seconds') / 60 / 60).toFixed(2);
  }

  async closeSchedule(ctx) {
    try {
      const endDate =  new Date();
      const schedule = await ctx.app.service('schedules').patch(ctx.session.schedule._id, { endDate });
      if (schedule) {
        ctx.session.schedule = null;
        await ctx.reply(ctx.i18n.t(`${this.sceneName}.close.success`, {
          endDate: this.formatDate(schedule.endDate),
          totalWorkedHours: this.getTotalWorkedHours(schedule.startDate, schedule.endDate)
        }));
      } else {
        await ctx.reply(ctx.i18n.t(`${this.sceneName}.close.error`));
      }
    } catch (err) {
      await this.ctx.reply(ctx.i18n.t(`${this.sceneName}.error`));
    }
  }

  formatDate(date) {
    return moment(date).tz(this.ctx.session.application.timezone || DEFAULT_TIMEZONE).format('lll');
  }
}

module.exports = new CashShiftToggleScene(SCENE_NAME);
