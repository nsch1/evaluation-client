import {GET_CLASS, POST_STUDENT} from "../actions/types"

export default (state = {}, {type, payload}) => {
  switch(type) {
    case GET_CLASS:
      return payload
    case POST_STUDENT:
      return {
        ...state,
        students: [...state.students, payload]
      }
    default:
      return state
  }
}