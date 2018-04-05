import {GET_CLASSES, POST_CLASS} from "../actions/types"

export default (state = [], {type, payload}) => {
  switch(type) {
    case GET_CLASSES:
      return payload
    case POST_CLASS:
      return [...state, payload]
    default:
      return state
  }
}