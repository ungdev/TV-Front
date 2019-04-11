import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notificationsReducer } from 'redux-notifications'
import admin from './admin'
import artist from './artist'
import event from './event'
import image from './image'
import login from './login'
import partner from './partner'
import socketio from './socketio'
import user from './user'

export default combineReducers({
  routing: routerReducer,
  notifs: notificationsReducer,
  admin,
  artist,
  event,
  image,
  login,
  partner,
  socketio,
  user
})
