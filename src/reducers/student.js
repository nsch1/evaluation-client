import {GET_STUDENT, POST_EVALUATION} from "../actions/types"

export default (state = {}, {type, payload}) => {
  switch(type) {
    case GET_STUDENT:
      return payload
    case POST_EVALUATION:
      return {
        ...state, evaluations: state.evaluations.concat(payload).sort((a, b) => {
          return Number(new Date(b.date)) - Number(new Date(a.date))
        })
      }
    default:
      return state
  }
}