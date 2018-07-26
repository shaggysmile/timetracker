const Extra = require('telegraf/extra')
const SceneHandler = require('./SceneHandler');
const SCENE_NAME = 'CashShiftConfirmLocation';
const DEFAULT_MAX_DISTANCE = 1;

class CashShiftConfirmLocationScene extends SceneHandler {
  async initHandlers() {
    this.scene.on('message', this.handler.bind(this));
  }
  async runEnterReply() {
    this.keyboard = Extra.markup((markup) => {
      return markup.resize()
        .keyboard([
          markup.locationRequestButton(this.ctx.i18n.t('navigation.sendLocation')),
          this.ctx.i18n.t('navigation.help'),
          this.ctx.i18n.t('navigation.back')
        ]);
    });
    if(this.ctx.session.employee) {
      if(this.ctx.session.employee.options && this.ctx.session.employee.options.ignoreGeoPosition) {
        await this.ctx.scene.enter('CashShiftToggle');
      } else {
        this.ctx.reply(this.ctx.i18n.t(`${this.sceneName}.enter`), this.keyboard);
      }
    } else {
      await this.ctx.scene.enter('AuthEmployee');
    }
  }
  async handler(ctx) {
    if(ctx.message.forward_from) {
      return ctx.reply('Искандар. Разлогинтесь!',  this.keyboard)
    }
    if(!ctx.message.location) {
      return ctx.reply(ctx.i18n.t(`${this.sceneName}.validation.geo`),  this.keyboard)
    }
    if(this.ctx.session.schedule && this.ctx.session.schedule.location) {
      const {
        latitude: currentLatitude,
        longitude: currentLongitude
      } = ctx.message.location;
      const {
        location: {
          latitude: locationLatitude,
          longitude: locationLongitude,
          distance: locationMaxDistance
        }
      } = this.ctx.session.schedule.location;
      const maxDistance = locationMaxDistance && locationMaxDistance || DEFAULT_MAX_DISTANCE;
      const diffOffGeoLocations = this.getDiffOfGeoLocations(
        currentLatitude,
        currentLongitude,
        locationLatitude,
        locationLongitude
      );

      if(diffOffGeoLocations < maxDistance) {
        await ctx.scene.enter('CashShiftToggle');
      } else {
        await ctx.reply(ctx.i18n.t(`${this.sceneName}.notfound`),  this.keyboard);
      }
    }
  }

  getDiffOfGeoLocations(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const _lat1 = (lat1) * Math.PI / 180;
    const _lat2 = (lat2) * Math.PI / 180;
    const a = Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(_lat1) * Math.cos(_lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance*1000;
  }
}

module.exports = new CashShiftConfirmLocationScene(SCENE_NAME);
