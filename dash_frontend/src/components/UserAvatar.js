import React from 'react'
import moment from 'moment-timezone'
import { connect } from 'react-redux'
import { fetchEvent, createEvent, fetchEventfulAPI } from '../actions/events'
import { fetchUsers } from '../actions/users'


const UserAvatar = (props) => {

  const topThreeEvents = () => {
    let sortedEvents = props.user.events.sort(function(a, b) {
      a = new Date(a.start_time)
      b = new Date(b.start_time)
      return a > b ? 1 : a < b ? -1 : 0
    })

    const currentDate = new Date()
    const newestEvents = []

    for (const event of sortedEvents) {
      let startTime = new Date(event.end_time)
      if (startTime > currentDate) {
        newestEvents.push(event)
      }
    }

    const confirmedEvents = newestEvents.filter(event => {
      return event.invites[0].status === "confirmed"
    })

    if (confirmedEvents.length > 5) {
      const topFiveEvents = confirmedEvents.slice(0, 5)
      return topFiveEvents
    } else {
      return confirmedEvents
    }
  }

  const findEvent = (id) => {
    props.fetchEvent(id)
  }

  const createEvent = () => {
    props.createEvent()
  }

  const events = topThreeEvents()
  return (
    <div>
      <div id="userAvatarImage">
        <img src={props.user.photo}  alt={props.user.name} />
      </div>
      <div>
        <button onClick={createEvent}>Create Event</button>
        <button onClick={() => props.fetchEventfulAPI(props.user.hometown)}>Find Event</button>
        <button onClick={props.fetchUsers}>Friends</button>
      </div>
      <div id="upcomingEvents">
        <h3>Upcoming Events</h3>
        <div className="eventList">
        <ul className="list">
          {events.map(event => {
            let start_time = event.start_time.toString()
            let start_date = moment(start_time).format("MMM, Do")
            return <li key={event.id} onClick={() => {findEvent(event.id)}}>{event.title.length > 10 ? event.title.substring(0, 10) : event.title} | {start_date}</li>})}
        </ul>
        </div>
      </div>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, { fetchEvent, createEvent, fetchEventfulAPI, fetchUsers })(UserAvatar)
