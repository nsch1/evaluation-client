import * as request from 'superagent'
import {baseUrl} from "../constants"
import {USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT} from "./types"

export const login = ({email, password}) => (dispatch) => {
  request
    .post(`${baseUrl}/logins`)
    .send({email, password})
    .then(res => {
      console.log(res.body)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: res.body
      })
    })
    .catch(err => {
      if (err.status === 400) {
        dispatch({
          type: USER_LOGIN_FAILED,
          payload: err.response.body.message || 'Something went wrong'
        })
      } else {
        console.error(err)
      }
    })
}

export const logout = () => ({
  type: USER_LOGOUT
})