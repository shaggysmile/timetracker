import Vue from 'vue'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

export default ({ app, store }) => {
  moment.locale('ru')
  Vue.use(VueMoment, {
    moment
  })
}
