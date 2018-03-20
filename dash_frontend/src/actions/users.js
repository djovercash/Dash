import UserApi from '../services/usersApi'

export const FETCHING_USERS = "FETCHING_USERS"
export const FETCHED_USERS = "FETCHED_USERS"
export const FETCHING_USER = "FETCHING_USER"
export const FETCHED_USER = "FETCHED_USER"
export const SIGNUP = "SIGNUP"
export const NOSIGNUP = "NO_SIGNUP"
export const ADDING_FRIEND = "ADDING_FRIEND"
export const ADDED_FRIEND = "ADDED_FRIEND"
export const CREATING_USER = "CREATING_USER"
export const CREATED_USER = "CREATED_USER"
export const UPDATING_STATUS = "UPDATING_STATUS"
export const UPDATED_STATUS = "UPDATED_STATUS"
export const LOGOUT = "LOGOUT"

export function login(user) {
  return function(dispatch) {
    dispatch({ type: FETCHING_USER })
    return UserApi.login(user.email, user.password).then(user => {
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

export function fetchUsers() {
  return function(dispatch) {
    dispatch({ type: FETCHING_USERS })
    UserApi.fetchUsers().then(users => {
      dispatch({
        type: FETCHED_USERS,
        payload: users
      })
    })
  }
}

export function createUser(user) {
  return function(dispatch) {
    dispatch({ type: CREATING_USER})
    return UserApi.createUser(user).then(newUser => {
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

export function noSignup() {
  return {
    type: NOSIGNUP
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

export function addFriend(friendship) {
  return function(dispatch) {
    dispatch({ type: ADDING_FRIEND })
    UserApi.addFriend(friendship.user.id, friendship.friend.id).then(newFriend => {
      dispatch({
        type: ADDED_FRIEND,
        payload: newFriend
      })
    })
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
