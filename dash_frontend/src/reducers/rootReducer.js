// import userReducer from './userReducer'
// import eventReducer from './eventReducer'
// import {combineReducers} from 'redux'

import {CREATE_EVENT, ADDING_EVENT, ADDED_EVENT, EDIT_EVENT, EDITING_EVENT, EDITED_EVENT, FETCHING_EVENT, FETCHED_EVENT, FETCHING_EVENTS, FETCHED_EVENTS, FETCHING_EVENTFUL_EVENTS, FETCHED_EVENTFUL_EVENTS, DELETE_EVENT} from '../actions/events'
import {HOME, ACCOUNT, FETCHING_USERS, FETCHED_USERS, FETCHING_USER, FETCHED_USER, ADDING_FRIEND, ADDED_FRIEND, CREATING_USER, CREATED_USER, LOGOUT, SIGNUP, NOSIGNUP, UPDATING_STATUS, UPDATED_STATUS, UPDATING_USER, UPDATED_USER, DELETE_ACCOUNT} from '../actions/users'
//
export const defaultState = {
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
  users: [],
  isLoading: false,
  createForm: false,
  editForm: false,
  loggedIn: false,
  signup: false,
  eventfulEvents: [],
  eventfulSearch: false,
  updateAccount: false,
  error: '',
  findFriends: false
}

function rootReducer (state = defaultState, action) {
  switch(action.type) {
    case FETCHING_USER:
        return {...state, isLoading: true};
    case FETCHED_USER:
        if (action.payload.message) {
          return {...state, isLoading: false, error: action.payload.message}
        } else {
          if (localStorage.user_id) {
            return {...state, user: action.payload, isLoading: false, loggedIn: true, error: ''};
          } else {
            localStorage.setItem("user_id", action.payload.id)
            return {...state, user: action.payload, isLoading: false, loggedIn: true, error: ''};
          };
        }
    case FETCHING_USERS:
        return {...state, isLoading: true};
    case FETCHED_USERS:
        const otherUsers = action.payload.filter(user => user.id !== state.user.id)
        return {...state, users: otherUsers, isLoading: false, findFriends: true}
    case SIGNUP:
          return {...state, signup: true};
    case NOSIGNUP:
          return {...state, signup: false};
    case ACCOUNT:
          return {...state, updateAccount: true};
    case HOME:
          return {...state,
            findFriends: false,
            isLoading: false,
            createForm: false,
            editForm: false,
            eventfulSearch: false,
            updateAccount: false,
            specific_event: {title: '', location: '', description: '', start_time: '', end_time: '',
              users: [{name: '', email: '', photo: '', hometown: '', password_digest: '',
                invites: [{user_id: null, event_id: null, admin: null, status: '', host: null }]
              }]
            }
          }
    case CREATING_USER:
        return {...state, isLoading: true};
    case CREATED_USER:
      localStorage.setItem("user_id", action.payload.id)
      return {...state, user: action.payload, isLoading: false, loggedIn: true, signup: false};
    case ADDING_FRIEND:
      return {...state, isLoading: true};
    case ADDED_FRIEND:
      return {...state,
        user: {...state.user,
          friends: [...state.user.friends,
            {id: action.payload.id,
              name: action.payload.name,
              email: action.payload.email,
              hometown: action.payload.hometown,
              photo: action.payload.photo,
              friend_category: []
            }
          ]
        },
        isLoading: false
      }
    case UPDATING_STATUS:
      return {...state, isLoading: true};
    case UPDATED_STATUS:
      const invite = action.payload
      const nonEditedUserEventInvites = state.user.events.filter(event => event.id !== action.payload.event_id)
      const editedUserEventInvites = state.user.events.filter(event => event.id === action.payload.event_id)
      const nonEditedEventInvites = state.events.filter(event => event.id !== action.payload.event_id)
      const editedEventInvite = state.user.events.filter(event => event.id === action.payload.event_id)
      const updatedSpecificEventUsers = state.specific_event.users.filter(user => user.id !== action.payload.user_id)
      const updatedSpecificEventUser = state.specific_event.users.filter(user => user.id === action.payload.user_id)
      return {...state,
        user: {
          ...state.user,
          events: [
            ...nonEditedUserEventInvites,
            {
              description: editedUserEventInvites[0].description,
              end_time: editedUserEventInvites[0].end_time,
              id: editedUserEventInvites[0].id,
              invites: [invite],
              start_time: editedUserEventInvites[0].start_time,
              title: editedUserEventInvites[0].title
            }
          ]
        },
        events: [
          ...nonEditedEventInvites,
          ...editedEventInvite
        ],
        isLoading: false,
        specific_event: {
          ...state.specific_event,
          users: [
            ...updatedSpecificEventUsers,
            {
              email: updatedSpecificEventUser[0].email,
              title: updatedSpecificEventUser[0].title,
              hometown: updatedSpecificEventUser[0].hometown,
              description: updatedSpecificEventUser[0].description,
              id: updatedSpecificEventUser[0].id,
              invites: [invite],
              name: updatedSpecificEventUser[0].name,
              photo: updatedSpecificEventUser[0].photo
            }
          ]
        }
      }
    case UPDATING_USER:
        return {...state, isLoading: true};
    case UPDATED_USER:
        return {...state, user: action.payload, updateAccount: false, isLoading: false}
    case CREATE_EVENT:
        return {...state, createForm: true};
    case ADDING_EVENT:
        return {...state, isLoading: true, createForm: false};
    case ADDED_EVENT:
        return {...state,
          user: {
            ...state.user,
            events: [
              ...state.user.events,
              {
                title: action.payload.title,
                description: action.payload.description,
                end_time: action.payload.end_time,
                id: action.payload.id,
                invites: [
                  action.payload.users[0].invites[0]
                ],
                location: action.payload.location,
                start_time: action.payload.start_time
                }
              ]
            },
          events: [
            ...state.events, action.payload
            ],
          isLoading: false,
          specific_event: action.payload,
          eventfulEvents: [],
          eventfulSearch: false
        };
    case EDIT_EVENT:
        return {...state, editForm: true};
    case EDITING_EVENT:
        return {...state, isLoading: true, editForm: false};
    case EDITED_EVENT:
        const nonEditedEvents = state.events.filter(event => event.id !== action.payload.id)
        const nonEditedUserEvents = state.user.events.filter(event => event.id !== action.payload.id)
        const userInvite = action.payload.users.filter(user => user.id === state.user.id)
        const userInvite2 = userInvite.find(invite => invite.id === state.user.id)
        return {...state,
          user: {
            ...state.user,
            events: [
              ...nonEditedUserEvents,
              {
                description: action.payload.description,
                end_time: action.payload.end_time,
                id: action.payload.id,
                invites: [
                  ...userInvite2.invites
                ],
                location: action.payload.location,
                start_time: action.payload.start_time,
                title: action.payload.title
              }
            ]
          },
          events: [
            ...nonEditedEvents, action.payload
          ],
          isLoading: false,
          specific_event: action.payload
        };
    case FETCHING_EVENTS:
        return {...state, isLoading: true};
    case FETCHED_EVENTS:
        return {...state, events: action.payload, isLoading: false};
    case FETCHING_EVENT:
        return {...state, isLoading: true};
    case FETCHED_EVENT:
        return {...state, specific_event: action.payload, isLoading: false, eventfulSearch: false};
    case FETCHING_EVENTFUL_EVENTS:
        return {...state, isLoading: true};
    case FETCHED_EVENTFUL_EVENTS:
        return {...state, eventfulEvents: action.payload.events.event, isLoading: false, eventfulSearch: true}
    case DELETE_EVENT:
        const nonDeletedEvents = state.events.filter(event => event.id !== action.payload.id)
        const nonDeletedUserEvents = state.user.events.filter(event => event.id !== action.payload.id)
        return {
          ...state,
          user: {
            ...state.user,
            events: [
              ...nonDeletedUserEvents
            ],
          },
          events: [
            ...nonDeletedEvents
          ],
          specific_event: {
            title: '',
            location: '',
            description: '',
            start_time: '',
            end_time: '',
            users: [{
              name: '',
              email: '',
              photo: '',
              hometown: '',
              password_digest: '',
              invites: [{
                user_id: null,
                event_id: null,
                admin: null,
                status: '',
                host: null
              }]
            }]
          }
        };
    case LOGOUT:
      localStorage.clear()
      return {
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
        createForm: false,
        editForm: false,
        loggedIn: false
      };
    case DELETE_ACCOUNT:
        localStorage.clear()
        return defaultState
    default:
      return state
  }
}


export default rootReducer

// export default combineReducers({userReducer, eventReducer})
