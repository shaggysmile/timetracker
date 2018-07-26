import feathers from '@feathersjs/client'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { CookieStorage } from 'cookie-storage'

const socket = io('https://tt.api.room5.cafe/', {
  transport: 'websocket',
  secure: true
})
const feathersClient = feathers()
  .configure(socketio(socket, {timeout: 30000}))
  .configure(auth({
    cookie: 'tt-token',
    storageKey: 'tt-token',
    storage: new CookieStorage({path: '/'})
  }))
export default feathersClient
