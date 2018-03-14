import UserApi from '../services/UsersApi'

export const FETCHING_USER = "FETCHING_USER"
export const FETCHED_USER = "FETCHED_USER"

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
