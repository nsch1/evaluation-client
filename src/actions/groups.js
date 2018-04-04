import * as request from 'superagent'
import {baseUrl} from "../constants"
import {GET_CLASSES} from "./types"

export const getAllGroups = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/classes`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => {
      dispatch({
        type: GET_CLASSES,
        payload: res.body
      })
    })
    .catch(err => console.error(err))
}