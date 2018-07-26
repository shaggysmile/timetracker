const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'AuthApp';

class AuthAppScene extends SceneHandler {
  initHandlers() {
    this.scene.on('message', this.setApplication.bind(this));
  }
  async setApplication(ctx) {
    try {
      const application = await ctx.app.service('application').find({
        query: {
          pincode: ctx.message.text
        }
      });
      if (application.total > 0) {
        Object.assign(ctx.session, {
          application: application.data[0]
        });
        await ctx.scene.enter('AuthEmployee');
      } else {
        await ctx.reply(ctx.i18n.t(`${this.sceneName}.notfound`));
      }
    } catch (err) {
      await ctx.reply(ctx.i18n.t(`${this.sceneName}.error`));
    }
  }
}

module.exports = new AuthAppScene(SCENE_NAME);
