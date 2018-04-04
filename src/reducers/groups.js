import {GET_CLASSES} from "../actions/types"

export default (state = [], {type, payload}) => {
  switch(type) {
    case GET_CLASSES:
      return payload
    default:
      return state
  }
}