import React from 'react'
import moment from 'moment-timezone'
import { connect } from 'react-redux'
import { fetchEvent, createEvent, fetchEventfulAPI} from '../actions/events'


const UserAvatar = (props) => {

  const topThreeEvents = () => {
    console.log(props.user.events)
    let sortedEvents = props.user.events.sort(function(a, b) {
      a = new Date(a.start_time)
      b = new Date(b.start_time)
      return a > b ? 1 : a < b ? -1 : 0
    })

    const currentDate = new Date()
    const newestEvents = []

    for (const event of sortedEvents) {
      let startTime = new Date(event.start_time)
      if (startTime > currentDate) {
        newestEvents.push(event)
      }
    }

    const confirmedEvents = newestEvents.filter(event => {
      return event.invites[0].status === "confirmed"
    })
    if (confirmedEvents.length > 3) {
      const topThreeEvents = confirmedEvents.slice(0, 3)
      return topThreeEvents
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
      <img src={props.user.photo}  alt={props.user.name} height="250" width="250"/>
      <div>
        <button onClick={createEvent}>Create Event</button>
        <button onClick={() => props.fetchEventfulAPI(props.user.hometown)}>Find Event</button>
      </div>
      <div id="upcomingEvents">
        <h3>Upcoming Events</h3>
        <div>
          {events.map(event => {
            let start_time = event.start_time.toString()
            let start_date = moment(start_time).format("MMM, Do YYYY")
            return <h5 key={event.id} onClick={() => {findEvent(event.id)}}>{event.title.length > 10 ? event.title.substring(0, 10) : event.title} | {start_date}</h5>})}
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


export default connect(mapStateToProps, { fetchEvent, createEvent, fetchEventfulAPI })(UserAvatar)
