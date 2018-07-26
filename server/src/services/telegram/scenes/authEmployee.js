const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'AuthEmployee';

class AuthEmployeeScene extends SceneHandler {
  initHandlers() {
    this.scene.on('message', this.setEmployee.bind(this));
  }
  async setEmployee(ctx) {
    try {
      if(ctx.session.application) {
        const employee = await ctx.app.service('employees').find({
          query: {
            application: ctx.session.application._id,
            pincode: ctx.message.text
          }
        });
        if (employee.total > 0) {
          await ctx.app.service('employees').patch(employee.data[0]._id, {
            accounts: {
              telegram: ctx.message.from.id
            }
          });
          Object.assign(ctx.session, {
            employee: employee.data[0]
          });
          await ctx.reply(ctx.i18n.t(`${this.sceneName}.success`));
        } else {
          await ctx.reply(ctx.i18n.t(`${this.sceneName}.notfound`));
        }
      } else {
        await ctx.scene.enter('AuthApp');
      }

    } catch (err) {
      await ctx.reply(ctx.i18n.t(`${this.sceneName}.error`));
    }
  }
}

module.exports = new AuthEmployeeScene(SCENE_NAME);
