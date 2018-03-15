// import {FETCHING_USER, FETCHED_USER} from '../actions/users'
//
//
// const defaultState = {
//   user: {name: '', email: '', photo: '', hometown: '', password_digest: '',
//     friends: [{name: '', email: '', photo: '', hometown: '', password_digest: '', friend_category: []}],
//     events: [{title: '', location: '', description: '', start_time: '', end_time: '',
//       invite: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
//     }]
//   },
// }
//
// function userReducer (state = defaultState, action) {
//   console.log(state)
//   switch(action.type) {
//     case FETCHING_USER:
//       return {...state, isLoading: true};
//     case FETCHED_USER:
//         return {user: action.payload, isLoading: false}
//     default:
//       return state
//   }
// }
//
// export default userReducer
