import React from 'react'
import { connect } from 'react-redux'
import { fetchEvent, createEvent} from '../actions/events'


const UserAvatar = (props) => {

  const topThreeEvents = () => {
    let sortedEvents = props.user.events.sort(function(a, b) {
      a = new Date(a.start_time)
      b = new Date(b.start_time)
      return a > b ? 1 : a < b ? -1 : 0
    })

    sortedEvents.filter(event => {
      return event.invites[0].status === "confirmed"
    })

    if (sortedEvents.length > 3) {
      const topThreeEvents = sortedEvents.slice(0, 3)
      return topThreeEvents
    } else {
      return sortedEvents
    }
  }

  const findEvent = (id) => {
    props.fetchEvent(id)
  }

  const createEvent = () => {
    props.createEvent()
  }

  const events = topThreeEvents()
  console.log(props.user)

  return (
    <div>
      <img src={props.user.photo}  alt={props.user.name} />
      <h5>Welcome Back, {props.user.name}</h5>
      <div>
        <h5>Upcoming Events</h5>
        <div>
          {events.map(event => {
            return <h5 onClick={() => {findEvent(event.id)}} key={event.title}>{event.title}</h5>
          })}
        </div>
      </div>
      <button onClick={createEvent}>Create Event</button>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, { fetchEvent, createEvent })(UserAvatar)
