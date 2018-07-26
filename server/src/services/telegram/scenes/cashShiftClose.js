const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'CashShiftClose';

class CashShiftOpenScene extends SceneHandler {
  async runEnterReply() {
    if(this.ctx.session.schedule && this.ctx.session.schedule.startDate && !this.ctx.session.schedule.endDate) {
      this.ctx.scene.enter('CashShiftConfirmLocation');
    } else {
      await this.ctx.reply(this.ctx.i18n.t(`CashShiftConfirmLocation.enterError`),  this.keyboard);
      await this.ctx.scene.enter('CashShiftOpen');
    }
  }
}

module.exports = new CashShiftOpenScene(SCENE_NAME);
