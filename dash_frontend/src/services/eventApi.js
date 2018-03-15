const EVENTURL = 'http://localhost:3000/events'

class eventApi {
  static fetchEvent(id) {
    return fetch(`${EVENTURL}/${id}`).then(res => res.json())
  }
}

export default eventApi
