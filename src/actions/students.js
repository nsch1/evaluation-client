import {baseUrl} from "../constants"
import * as request from "superagent"
import {GET_STUDENT} from "./types"


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