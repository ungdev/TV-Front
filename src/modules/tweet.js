import axios from '../lib/axios'
import { actions as notifActions } from 'redux-notifications'
import moment from 'moment'
import errorToString from '../lib/errorToString'


const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const editTweet = (id, params) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      await axios.put(`tweets/${id}`, params, {
        headers: {
          Authorization: `Basic ${authToken}`,
          'X-Date': moment().format()
        }
      })
      dispatch(
        notifActions.notifSend({
          message:
            'Le tweet a été modifié',
          dismissAfter: 2000
        })
      )
    } catch (err) {
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}
