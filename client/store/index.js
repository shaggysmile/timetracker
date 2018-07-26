import Vuex from 'vuex'
import feathersClient from '@/plugins/feathers-client'
import feathersVuex, { initAuth } from 'feathers-vuex'
const { service, auth } = feathersVuex(feathersClient, { idField: '_id' })

const createStore = () => {
  return new Vuex.Store({
    state: {
      locales: ['en', 'ru'],
      locale: 'en'
    },
    actions: {
      nuxtServerInit ({ commit, dispatch }, { req }) {
        return initAuth({
          commit,
          dispatch,
          req,
          moduleName: 'auth',
          cookieName: 'tt-token'
        })
      }
    },
    plugins: [
      service('application'),
      service('schedules'),
      service('employees'),
      service('locations'),
      auth({ userService: 'application' })
    ]
  })
}

export default createStore
