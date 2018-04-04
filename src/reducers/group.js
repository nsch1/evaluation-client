import {GET_CLASS} from "../actions/types"

export default (state = {}, {type, payload}) => {
  switch(type) {
    case GET_CLASS:
      return payload
    default:
      return state
  }
}