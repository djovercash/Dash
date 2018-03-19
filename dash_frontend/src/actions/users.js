import UserApi from '../services/usersApi'

export const FETCHING_USER = "FETCHING_USER"
export const FETCHED_USER = "FETCHED_USER"
export const SIGNUP = "SIGNUP"
export const CREATING_USER = "CREATING_USER"
export const CREATED_USER = "CREATED_USER"
export const UPDATING_STATUS = "UPDATING_STATUS"
export const UPDATED_STATUS = "UPDATED_STATUS"
export const LOGOUT = "LOGOUT"

export function login(user) {
  return function(dispatch) {
    dispatch({ type: FETCHING_USER })
    UserApi.login(user.email, user.password).then(user => {
      dispatch({
        type: FETCHED_USER,
        payload: user
      })
    })
  }
}

export function fetchUser(id) {
  return function(dispatch) {
    dispatch({ type: FETCHING_USER })
    UserApi.fetchUser(id).then(user => {
      dispatch({
        type: FETCHED_USER,
        payload: user
      })
    })
  }
}

export function createUser(user) {
  return function(dispatch) {
    dispatch({ type: CREATING_USER})
    UserApi.createUser(user).then(newUser => {
      dispatch({
        type: CREATED_USER,
        payload: newUser
      })
    })
  }
}

export function signup() {
  return {
    type: SIGNUP
  }
}

export function updateStatus(event, status) {
  return function(dispatch) {
    dispatch({ type: UPDATING_STATUS})
    UserApi.updateStatus(event[0].id, status).then(invite => {
      dispatch({
        type: UPDATED_STATUS,
        payload: invite
      })
    })
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
