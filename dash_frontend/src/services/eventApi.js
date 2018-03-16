const EVENTURL = 'http://localhost:3000/events'

class eventApi {
  static fetchEvent(id) {
    return fetch(`${EVENTURL}/${id}`).then(res => res.json())
  }

  static fetchEvents() {
    return fetch(EVENTURL).then(res => res.json())
  }

  static createEvent(event) {
    return fetch(EVENTURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: event.title,
        location: event.location,
        description: event.description,
        start_time: event.start_time,
        end_time: event.end_time,
        user_id: event.user_id,
        friends: event.friends
      })
    }).then(res => res.json())
  }

  static updateEvent(event) {
    return fetch(`${EVENTURL}/${event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: event.title,
        location: event.location,
        description: event.description,
        start_time: event.start_time,
        end_time: event.end_time,
        user_id: event.user_id,
        friends: event.friends
      })
    }).then(res => res.json())
  }
}

export default eventApi
