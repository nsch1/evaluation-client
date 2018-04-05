import {baseUrl} from "../constants"
import * as request from "superagent"
import {POST_EVALUATION} from "./types"

export const postEvaluation = (data, studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/students/${studentId}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(res => {
      dispatch({
        type: POST_EVALUATION,
        payload: res.body
      })
    })
    .catch(err => console.log(err))
}