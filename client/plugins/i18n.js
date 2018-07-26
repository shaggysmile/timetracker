import Vue from 'vue'
import VueI18n from 'vue-i18n'

const numberFormats = {
  'en': {
    currency: {
      useGrouping: true
    }
  }
}

const dateTimeFormats = {
  'en': {
    time: { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false },
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric' }
  }
}

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    numberFormats,
    dateTimeFormats,
    messages: {
      'en': require('~/locales/en.json'),
      'ru': require('~/locales/ru.json')
    }
  })
}
