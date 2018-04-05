import * as request from 'superagent'
import {baseUrl} from "../constants"
import {GET_CLASS, GET_CLASSES, POST_CLASS} from "./types"

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

export const getGroup = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/classes/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => {
      dispatch({
        type: GET_CLASS,
        payload: res.body
      })
    })
    .catch(err => console.log(err))
}

export const postGroup = (data) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/classes`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(res => {
      dispatch({
        type: POST_CLASS,
        payload: res.body
      })
    })
    .catch(err => console.log(err))
}
