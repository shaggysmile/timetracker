const Markup = require('telegraf/markup');
const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'CashShiftChoosePosition';

class CashShiftChoosePositionScene extends SceneHandler {
  initHandlers() {
    this.scene.on('message', this.handler.bind(this));
  }
  async runEnterReply() {
    const positions = await this.getPositions(this.ctx);
    this.keyboard = Markup.keyboard([
      ...positions.data.map(position => position.title),
      this.ctx.i18n.t('navigation.back'),
      this.ctx.i18n.t('navigation.help')
    ])
      .resize()
      .extra();
    this.ctx.reply(this.ctx.i18n.t(`${this.sceneName}.enter`), this.keyboard);
  }

  async getPositions(ctx) {
    return ctx.app.service('positions').find({
      query: {
        application: ctx.session.application._id
      }
    });
  }

  async choosePosition(ctx, title) {
    const positions = await this.getPositions(this.ctx);
    return positions.data.find(location => location.title === title);
  }

  async handler(ctx) {
    const position = await this.choosePosition(ctx, ctx.message.text);
    if(position) {
      this.ctx.session.schedule.position = position;
      await ctx.scene.enter('CashShiftChooseLocation');
    } else {
      await ctx.reply(ctx.i18n.t(`${this.sceneName}.notfound`), this.keyboard);
    }
  }
}

module.exports = new CashShiftChoosePositionScene(SCENE_NAME);
