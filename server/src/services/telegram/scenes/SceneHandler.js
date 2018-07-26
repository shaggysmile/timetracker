const Scene = require('telegraf/scenes/base');
class SceneHandler {
  constructor(name) {
    this.sceneName = name;
    this.scene = new Scene(this.sceneName);
    this.scene.enter(this.init.bind(this));
    return this.scene;
  }

  init(ctx) {
    this.setContext(ctx);
    this.setService();
    this.runEnterReply();
    this.initHandlers();
  }

  setContext(ctx) {
    this.ctx = ctx;
  }

  setService() {
    this.service = this.ctx.app.service;
  }

  runEnterReply() {
    this.ctx.reply(this.ctx.i18n.t(`${this.sceneName}.enter`));
  }

  initHandlers() {
  }

  get scene() {
    return this._scene;
  }

  set scene(val) {
    this._scene = val;
  }

  set sceneName(val) {
    this._sceneName = val;
  }
  get sceneName() {
    return this._sceneName;
  }
}

module.exports = SceneHandler;
