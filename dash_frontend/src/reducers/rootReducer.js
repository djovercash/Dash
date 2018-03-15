// import userReducer from './userReducer'
// import eventReducer from './eventReducer'
// import {combineReducers} from 'redux'

import {FETCHING_EVENT, FETCHED_EVENT} from '../actions/events'
import {FETCHING_USER, FETCHED_USER} from '../actions/users'
//
const defaultState = {
  user: {name: '', email: '', photo: '', hometown: '', password_digest: '',
    friends: [{name: '', email: '', photo: '', hometown: '', password_digest: '', friend_category: []}],
    events: [{title: '', location: '', description: '', start_time: '', end_time: '',
      invite: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
    }]
  },
  events: [{title: '', location: '', description: '', start_time: '', end_time: '',
    users: [{name: '', email: '', photo: '', hometown: '', password_digest: '',
      invite: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
    }]
  }],
  specific_event: {title: '', location: '', description: '', start_time: '', end_time: '',
    users: [{name: '', email: '', photo: '', hometown: '', password_digest: '',
      invite: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
    }]
  },
  isLoading: false
}

function rootReducer (state = defaultState, action) {
  switch(action.type) {
    case FETCHING_USER:
        return {...state, isLoading: true};
    case FETCHED_USER:
        return {...state, user: action.payload, isLoading: false}
    case FETCHING_EVENT:
        return {...state, isLoading: true}
    case FETCHED_EVENT:
        return {...state, specific_event: action.payload, isLoading: false}
    default:
      return state
  }
}


export default rootReducer

// export default combineReducers({userReducer, eventReducer})
