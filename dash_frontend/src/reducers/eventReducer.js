// import {ADD_EVENT} from '../actions/events'
// import {FETCHING_EVENT, FETCHED_EVENT} from '../actions/events'
//
// const defaultState = {
//   events: [{title: '', location: '', description: '', start_time: '', end_time: '',
//     users: [{name: '', email: '', photo: '', hometown: '', password_digest: '',
//       invite: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
//     }]
//   }],
//   specific_event: {title: '', location: '', description: '', start_time: '', end_time: '',
//     users: [{name: '', email: '', photo: '', hometown: '', password_digest: '',
//       invite: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
//     }]
//   }
// }
//
// function eventReducer (state = defaultState, action) {
//   switch(action.type) {
//     case ADD_EVENT:
//       return {...state, events: [...state.events, action.payload]};
//     default:
//       return state
//   }
// }
//
// export default eventReducer
