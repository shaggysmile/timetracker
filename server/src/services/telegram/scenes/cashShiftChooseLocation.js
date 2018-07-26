const Markup = require('telegraf/markup');
const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'CashShiftChooseLocation';

class CashShiftChooseLocationScene extends SceneHandler {
  initHandlers() {
    this.scene.on('message', this.handler.bind(this));
  }
  async runEnterReply() {
    const locations = await this.getLocations(this.ctx);
    this.keyboard = Markup.keyboard([
      ...locations.data.map(location => location.name),
      this.ctx.i18n.t('navigation.help'),
      this.ctx.i18n.t('navigation.back')
    ])
      .resize()
      .extra();
    this.ctx.reply(this.ctx.i18n.t(`${this.sceneName}.enter`), this.keyboard);
  }

  async getLocations(ctx) {
    return ctx.app.service('locations').find({
      query: {
        application: ctx.session.application._id
      }
    });
  }

  async chooseLocation(ctx, title) {
    const locations = await this.getLocations(this.ctx);
    return locations.data.find(location => location.name === title);
  }

  async handler(ctx) {
    const location = await this.chooseLocation(ctx, ctx.message.text)
    if(location) {
      this.ctx.session.schedule.location = location;
      await ctx.scene.enter('CashShiftConfirmLocation');
    } else {
      await ctx.reply(ctx.i18n.t(`${this.sceneName}.notfound`), this.keyboard);
    }
  }
}

module.exports = new CashShiftChooseLocationScene(SCENE_NAME);
