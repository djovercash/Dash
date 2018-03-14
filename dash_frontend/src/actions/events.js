export const ADD_EVENT = "ADD_EVENT"



export function addEvent(event) {
  return {
    type: ADD_EVENT,
    payload: event
  }
}
