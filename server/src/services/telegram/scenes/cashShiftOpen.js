const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'CashShiftOpen';

class CashShiftOpenScene extends SceneHandler {
  async runEnterReply() {
    Object.assign(this.ctx.session, {
      schedule: {
        application : this.ctx.session.application._id,
        employee : this.ctx.session.employee._id,
        startDate: null,
        endDate: null,
        location : null,
        position : null,
      }
    });
    this.ctx.scene.enter('CashShiftChoosePosition');
  }
}

module.exports = new CashShiftOpenScene(SCENE_NAME);
