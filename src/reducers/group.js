import {DELETE_STUDENT, GET_CLASS, POST_STUDENT} from "../actions/types"

export default (state = {}, {type, payload}) => {
  switch(type) {
    case GET_CLASS:
      return payload
    case POST_STUDENT:
      return {
        ...state,
        students: [...state.students, payload]
      }
    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(s => {
          return s.name !== payload.name
        })
      }
    default:
      return state
  }
}