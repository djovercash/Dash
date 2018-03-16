// import userReducer from './userReducer'
// import eventReducer from './eventReducer'
// import {combineReducers} from 'redux'

import {CREATE_EVENT, ADDING_EVENT, ADDED_EVENT, FETCHING_EVENT, FETCHED_EVENT, FETCHING_EVENTS, FETCHED_EVENTS} from '../actions/events'
import {FETCHING_USER, FETCHED_USER} from '../actions/users'
//
const defaultState = {
  user: {name: '', email: '', photo: '', hometown: '', password_digest: '',
    friends: [{name: '', email: '', photo: '', hometown: '', password_digest: '', friend_category: []}],
    events: [{title: '', location: '', description: '', start_time: '', end_time: '',
      invites: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
    }]
  },
  events: [{title: '', location: '', description: '', start_time: '', end_time: '',
    users: [{name: '', email: '', photo: '', hometown: '', password_digest: '',
      invites: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
    }]
  }],
  specific_event: {title: '', location: '', description: '', start_time: '', end_time: '',
    users: [{name: '', email: '', photo: '', hometown: '', password_digest: '',
      invites: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
    }]
  },
  isLoading: false,
  eventForm: false
}

function rootReducer (state = defaultState, action) {
  switch(action.type) {
    case FETCHING_USER:
        return {...state, isLoading: true};
    case FETCHED_USER:
        console.log(action.payload)
        return {...state, user: action.payload, isLoading: false};
    case CREATE_EVENT:
        return {...state, eventForm: true};
    case ADDING_EVENT:
        return {...state, isLoading: true, eventForm: false};
    case ADDED_EVENT:
        return {...state, user: {...state.user, events: [...state.user.events, {description: action.payload.description, end_time: action.payload.end_time, id: action.payload.id, invites: [action.payload.users[0].invites], location: action.payload.location, start_time: action.payload.start_time,}]}, events: [...state.events, action.payload], isLoading: false, specific_event: action.payload}
    case FETCHING_EVENTS:
        return {...state, isLoading: true};
    case FETCHED_EVENTS:
        return {...state, events: action.payload, isLoading: false};
    case FETCHING_EVENT:
        return {...state, isLoading: true};
    case FETCHED_EVENT:
        return {...state, specific_event: action.payload, isLoading: false};
    default:
      return state
  }
}


export default rootReducer

// export default combineReducers({userReducer, eventReducer})
