import {ADD_EVENT} from '../actions/events'
import {FETCHING_USER, FETCHED_USER} from '../actions/users'

const defaultState = {
  user: {name: "Yas", events: [ { start_time: ''} ]},
  events: [{name: "Sneeky"},{name: "Winky"},{name: "Peaky"}],
  isLoading: false
}

function rootReducer (state = defaultState, action) {
  switch(action.type) {
    case ADD_EVENT:
      return {...state, events: [...state.events, action.payload]};
    case FETCHING_USER:
      return {...state, isLoading: true};
    case FETCHED_USER:
        return {...state, user: action.payload, isLoading: false}
    default:
      return state
  }
}

export default rootReducer
