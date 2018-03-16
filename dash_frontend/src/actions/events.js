import eventApi from '../services/eventApi'

export const CREATE_EVENT = "CREATE_EVENT"
export const ADDING_EVENT = "ADDING_EVENT"
export const ADDED_EVENT = "ADDED_EVENT"
export const EDIT_EVENT = "EDIT_EVENT"
export const EDITING_EVENT = "EDITING_EVENT"
export const EDITED_EVENT = "EDITED_EVENT"
export const FETCHING_EVENT = "FETCHING_EVENT"
export const FETCHED_EVENT = "FETCHED_EVENT"
export const FETCHING_EVENTS = "FETCHING_EVENTS"
export const FETCHED_EVENTS = "FETCHED_EVENTS"
export const DELETE_EVENT = "DELETE_EVENT"

export function fetchEvents() {
  return function(dispatch) {
    dispatch({ type: FETCHING_EVENTS })
    eventApi.fetchEvents().then(returnedEvents => {
      dispatch({
        type: FETCHED_EVENTS,
        payload: returnedEvents
      })
    })
  }
}

export function fetchEvent(id) {
  return function(dispatch) {
    dispatch({ type: FETCHING_EVENT })
    eventApi.fetchEvent(id).then(returnedEvent => {
      dispatch({
        type: FETCHED_EVENT,
        payload: returnedEvent
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
    eventApi.createEvent(event).then(returnedEvent => {
      dispatch({
        type: ADDED_EVENT,
        payload: returnedEvent
      })
    })
  }
}

export function updateEvent(event) {
  return function(dispatch) {
    dispatch({ type: EDITING_EVENT})
    eventApi.updateEvent(event).then(returnedEvent => {
      dispatch({
        type: EDITED_EVENT,
        payload: returnedEvent
      })
    })
  }
}

export function deleteEvent(event) {
  eventApi.deleteEvent(event).then(res => console.log(res))
  return {
    type: DELETE_EVENT,
    payload: event
  }
}
