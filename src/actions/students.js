import {baseUrl} from "../constants"
import * as request from "superagent"
import {DELETE_STUDENT, EDIT_STUDENT, GET_STUDENT, POST_STUDENT} from "./types"


export const getStudent = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/students/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => {
      dispatch({
        type: GET_STUDENT,
        payload: res.body
      })
    })
    .catch(err => console.log(err))
}

export const postStudent = (data, groupId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/classes/${groupId}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(res => {
      dispatch({
        type: POST_STUDENT,
        payload: res.body
      })
    })
    .catch(err => console.log(err))
}

export const editStudent = (data, studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .patch(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(res => {
      dispatch({
        type: EDIT_STUDENT,
        payload: res.body
      })
    })
    .catch(err => console.log(err))
}

export const deleteStudent = (id) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .delete(`${baseUrl}/students/${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(res => {
      dispatch({
        type: DELETE_STUDENT,
        payload: res.body
      })
    })
    .catch(err => console.log(err))
}