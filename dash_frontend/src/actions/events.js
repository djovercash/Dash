import eventApi from '../services/eventApi'

export const CREATE_EVENT = "CREATE_EVENT"
export const ADDING_EVENT = "ADDING_EVENT"
export const ADDED_EVENT = "ADDED_EVENT"
export const EDIT_EVENT = "EDIT_EVENT"
export const FETCHING_EVENT = "FETCHING_EVENT"
export const FETCHED_EVENT = "FETCHED_EVENT"
export const FETCHING_EVENTS = "FETCHING_EVENTS"
export const FETCHED_EVENTS = "FETCHED_EVENTS"

export function fetchEvents() {
  return function(dispatch) {
    dispatch({ type: FETCHING_EVENTS })
    eventApi.fetchEvents().then(events => {
      dispatch({
        type: FETCHED_EVENTS,
        payload: events
      })
    })
  }
}

export function fetchEvent(id) {
  return function(dispatch) {
    dispatch({ type: FETCHING_EVENT })
    eventApi.fetchEvent(id).then(event => {
      dispatch({
        type: FETCHED_EVENT,
        payload: event
      })
    })
  }
}

export function createEvent() {
  return {
    type: CREATE_EVENT
  }
}

export function editEvent() {
  return {
    type: EDIT_EVENT
  }
}

export function addEvent(event) {
  return function(dispatch) {
    dispatch({ type: ADDING_EVENT })
    eventApi.createEvent(event).then(event => {
      dispatch({
        type: ADDED_EVENT,
        payload: event
      })
    })
  }
}
